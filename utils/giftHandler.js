const mongoose = require('mongoose');
const webpush = require("web-push");
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');
const validator = require('../tools/validator');

// Requiring models
let Student = require('../models/student');
let Gift = require('../models/gift');


async function commitGift(req, res, next) {

    let params = req.body;

    let issue = validator.commitGift(req, res);
    if (issue) return;
    
    let price = params.price;
    let info = params.info;
    let code = Number(params.code);

    let gift = new Gift({});

    // validation
    if(price <= 0){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PRICE});
        return;
    }

    // find student
    await Student.findOne({ code }, function(err, student) {

        if (err) {
            
            errHandler(err, res);
            issue = true;

        } else if (!student) { // if no student found
            res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
            issue = true;

        } else { // if student was found

            // creating gift
            gift._id = new mongoose.Types.ObjectId();
            gift.owner = student._id;
            gift.price = price;
            gift.info = info;

            // updating student
            student.gifts.push(gift);
            student.gift += gift.price;


            // save student
            student.save((err => {
                if (err) {
                    errHandler(err, res);
                    config.log(`err in saving student`);
                    issue = true;
                }
            }));

            // save purchase
            gift.save((err => {
                if (err) {
                    errHandler(err, res);
                    config.log(`err in saving gift`);
                    issue = true;
                }
            }));

            // notify student
            if (student.subscription) {

            const payload = JSON.stringify({ title: "سامانه مهتا", body: 'هدیه به مبلغ ' + price + ' تومان به شما داده شد.' });

            // Pass object into sendNotification
            webpush.sendNotification(student.subscription, payload)
              .catch(err => config.error(err));
            }

            res.status(consts.SUCCESS_CODE).send("OK");
        }
    });

    if (issue) return;
}

async function groupGift(req, res) {

    let params = req.body;
    let price = params.price || 0;
    let info = params.info || "هدایای گروهی";
    let query = {};

    if(price <= 0){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PRICE});
        return;
    }

    if(params.grade !== undefined && params.grade !== ""){

        if (params.grade !== 'all') {
            query.grade = params.grade;
        }
    }

    if(params.field !== undefined && params.field !== ""){

        if (params.field !== 'all') {
            query.field = params.field;
        }
    }

    if(params.school !== undefined && params.school !== ""){

        if (params.school !== 'all') {
            query.school = params.school;
        }
    }

    config.log(`query: `);
    config.log(query);

    let students = await Student.find(query);


    if(students.length === 0){
        res.status(consts.BAD_REQ_CODE).json({error:consts.NO_STUDENT_MATCHED});
        return;
    }

    const payload = JSON.stringify({ title: "سامانه مهتا", body: 'هدیه به مبلغ ' + price + ' تومان به شما داده شد.' });

    for(const student of students){

        let newGift = new Gift({});

        newGift._id = new mongoose.Types.ObjectId();
        newGift.owner= student._id;
        newGift.price= price;
        newGift.info= info;

        student.gifts.push(newGift);
        student.gift += price;



        if (student.subscription) {

          // Pass object into sendNotification
          webpush.sendNotification(student.subscription, payload)
            .catch(err => config.error(err));
        }


        await student.save();
        await newGift.save();
    }

    res.status(consts.SUCCESS_CODE).send("OK");
}

async function deleteGifts(ownerId) {

    await Gift.deleteMany({ owner: ownerId }, function(err, info) {

        if (err) {
            errHandler(err, res);

        } else {
            config.log(`deleted ${info.n} gifts`);
        }
    }).catch(err => {
        config.log(err)
    });
}

async function getGifts(ownerId, response) {

    let issue = false;

    let query = {
       owner: ownerId
    };

    let result = await Gift.find(query, {_id: 0, __v: 0, owner: 0}, function (err, gifts) {

        if (err) {
            issue = true;
            errHandler(err, res);
        } else {

        }
    });

    config.log('gifts: ');
    config.log(result);

    if (issue) return;


    // only way to change sent argument to a function in js is this: :)
    response.gifts = result;

}

module.exports = {commitGift, groupGift, deleteGifts, getGifts};


