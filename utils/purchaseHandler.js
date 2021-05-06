const mongoose = require('mongoose');
const webpush = require("web-push");
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');

// Requiring models
let Student = require('../models/student');
let Purchase = require('../models/purchase');


async function commitPurchase(req, res, next) {

    let params = req.body;

    let {code, price, percent, useGift, useCredit, info} = params;

    let purchase = new Purchase({});
    let studentToSave = {};
    let inviterId;

    let issue = false;

    if(percent < 0 || percent > 100 || !percent){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PERCENT});
        return;
    }

    if(price <= 0 || !price){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PRICE});
        return;
    }

    if(code === "" || code <= 0 || !code){
        res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
        return;
    }


    let payable = price;


    // find student
    await Student.findOne({ code: params.code }, function(err, student) {

        if (err) {
            errHandler(err, res);
            issue = true;

        } else if (!student) { // if no student found

            res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
            issue = true;

        } else { // if student was found

            purchase.usedGift = 0;
            purchase.usedCredit = 0;

            // credit, gift calculations
            if (useCredit) { config.log('usedCredit is true');
                if (payable > student.credit) { // if price was more than student's credit

                    payable -= student.credit;
                    purchase.usedCredit = student.credit;
                    student.credit = 0;

                    if (useGift) {

                        if (payable > student.gift) {

                            payable -= student.gift;
                            purchase.usedGift = student.gift;
                            student.gift = 0;

                        } else {
                            purchase.usedGift = payable;
                            student.gift -= payable;
                            payable = 0;
                        }

                    }

                } else {
                    purchase.usedCredit = payable;
                    student.credit -= payable;
                    payable = 0;

                }
            } else {

                if (useGift) {

                    if (payable > student.gift) {

                        payable -= student.gift;
                        purchase.usedGift = student.gift;
                        student.gift = 0;

                    } else {
                        purchase.usedGift = payable;
                        student.gift -= payable;
                        payable = 0;

                    }

                }
            }
            studentToSave = student;
        }
    });

    if (issue) return;

    purchase._id = new mongoose.Types.ObjectId();
    purchase.owner = studentToSave._id;
    purchase.price = params.price;
    purchase.payed = payable;
    purchase.percent = params.percent;
    purchase.info = params.info;


    studentToSave.purchases.push(purchase);

    // save student
    await studentToSave.save((err => { config.log('saving student');
        if (err) {
            errHandler(err, res);
            issue = true
        }
    }));

    if (issue) return;

    // save purchase
    issue = await purchase.save((err => {
        if (err) {
            errHandler(err, res);
            issue = true
        }
    }));

    if (issue) return;

    // if had an inviter and payed was not zero
    if (studentToSave.inviter !== "" && studentToSave.inviter !== undefined && purchase.payed !== 0){

        inviterId = studentToSave.inviter;

        Student.findOne({ _id: inviterId }, function(err, student) {

            if (err) {
                res.status(consts.SUCCESS_CODE).send("ُInviter finding error!!!");

            } else if (!student) { // if no inviter found
                res.status(consts.SUCCESS_CODE).send("ُInviter not found!!!");

            } else { // if inviter was found

                let increaseAmount = percent * purchase.payed / 100;

                student.credit += increaseAmount;

                // saving inviter
                student.save((err => {
                    if (err) errHandler(err, res);
                }));


              if (student.subscription) {

                  const payload = JSON.stringify({ title: "سامانه مهتا", body: 'مبلغ ' + increaseAmount + ' تومان از خرید ' +
                          studentToSave.firstName + ' ' + studentToSave.lastName
                          + ' به اعتبار شما افزوده شد' });

                // Pass object into sendNotification
                webpush.sendNotification(student.subscription, payload)
                  .catch(err => config.error(err));
              }


                res.status(consts.SUCCESS_CODE).send("OK");
            }
        });

    } else{

        res.status(consts.SUCCESS_CODE).send("OK");
    }

}//done

async function deletePurchases(ownerId) {

    let issue = false;

    await Purchase.deleteMany({ owner: ownerId }, function(err, info) {

        if (err) {
            errHandler(err, res);

        } else {
            config.log(`deleted ${info.n} purchases`);
        }
    }).catch(err => {
        config.log(err)
    });
}

async function getPurchases(ownerId, response) {

    let issue = false;

    let query = {
        owner: ownerId
    };

    let result = await Purchase.find(query, {_id: 0, __v: 0, owner: 0}, function (err, purchases) {

        if (err) {
            issue = true;
            errHandler(err, res);
        } else {

        }
    });

    config.log('purchases: ');
    config.log(result);


    if (issue) return;

    // only way to change sent argument to a function in js is this: :)
    response.purchases = result;

}

module.exports = {commitPurchase, deletePurchases, getPurchases};