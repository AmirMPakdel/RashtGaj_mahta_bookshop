const mongoose = require('mongoose');
const consts = require('./consts');
const dateConverter = require('../tools/dateConverter');
const errHandler = require('./errHandler');
const giftHandler = require('./giftHandler');
const purchaseHandler = require('./purchaseHandler');
const config = require('../config/config');
const validator = require('../tools/validator');

// Requiring models
let Student = require('../models/student');


async function getStudentList(req, res, next) {

    // config.log(req.cookies.token);

    // projecting fields
    await Student.find({}, { __v: 0 }, { sort: { 'code' : 1 } } , (err, students) => {

        if (err) {
            errHandler(err);

        } else {
            res.status(consts.SUCCESS_CODE).json(students);

        }
    });
}//done

async function addStudent(req, res, next) {

    let params = req.body;

    let issue = validator.addStudent(req, res);
    if(issue) return;

    let newStudent = new Student({});
    let inviterToSave;

    let query = { // no need need to convert to Number in add/edit :|
        code: params.code
    };

    // check if any student already own requested code
    await Student.findOne(query, function(err, student) {
        
        if (err) {
            errHandler(err, res);
            issue = true;

        } else if (student) { // if a student owns requested Code

            res.status(consts.BAD_REQ_CODE).json({error: consts.MAHTA_CODE_EXISTS});
            issue = true;
        }
    });

    if (issue) return;

    newStudent._id = new mongoose.Types.ObjectId();
    newStudent.code = await createCode(params.grade);
    newStudent.firstName = params.firstName;
    newStudent.lastName = params.lastName;
    newStudent.grade = params.grade;
    newStudent.field = params.field;
    newStudent.phone = params.phone;
    newStudent.password = params.phone;
    newStudent.home = params.home || 0;
    newStudent.school = params.school;


    // check if inviterCode is valid
    if (params.inviterCode) {

        // finding inviter
        await Student.findOne({ code: Number(params.inviterCode) }, function(err, inviter) {

            if (err) {
                errHandler(err, res);
                issue = true;

            } else if (!inviter) { // if found no inviter

                res.status(consts.BAD_REQ_CODE).json({error: consts.INCORRECT_INVITER_ID});
                issue = true;

            } else { // if inviterCode is valid

                // defining inviter for newStudent
                newStudent.inviter = inviter._id;

                // adding ref to inviter
                inviter.inviteds.push(newStudent);

                inviterToSave = inviter;

            }
        });

        if (issue) return;

        // saving inviter
        await inviterToSave.save((err => {

            if (err) {
                errHandler(err, res);
                issue = true;
            }
        }));

    }

    await newStudent.save((err => {
        if (err) {
            errHandler(err, res);
            config.log(`error at saving new student`);
            return;
        }
        res.status(consts.SUCCESS_CODE).send(newStudent);
    }));

}//done

async function createCode(grade) {
    config.log(`in create code`);
    let date = dateConverter.getLiveDate();

    let konkurYear = Number(date.substring(0, 4));

    let isFirst3Month = date.substring(5, 7) <= 3;

    switch (grade) {

        case 'دوازدهم' || 'فارغ التحصیل':
            if (isFirst3Month) {}
            else konkurYear += 1;
            break;

        case 'یازدهم':
            if (isFirst3Month) konkurYear += 1;
            else konkurYear += 2;
            break;

        case 'دهم':
            if (isFirst3Month) konkurYear += 2;
            else konkurYear += 3;
            break;

        case 'نهم':
            if (isFirst3Month) konkurYear += 3;
            else konkurYear += 4;
            break;

        case 'هشتم':
            if (isFirst3Month) konkurYear += 4;
            else konkurYear += 5;
            break;

        case 'هفتم':
            if (isFirst3Month) konkurYear += 5;
            else konkurYear += 6;
            break;

        case 'ششم':
            if (isFirst3Month) konkurYear += 6;
            else konkurYear += 7;
            break;
    }

    config.log(`konkurYear : ${konkurYear}`);

    let latestCode = 0;

    let issue = false;

    konkurYear = konkurYear * 10000;

    let temp = konkurYear;

    console.log(`temp : ${temp}`);

    await Student.findOne({ code: { $gt: temp, $lt: temp + 10000 }}, { code:1, _id:0 },
        { sort: { 'code' : -1 } },
        function(err, student) {

            config.log(`finding latest added student`);

            if (err) {
                issue = true;
                errHandler(err);

            } else if (student) { // if found student
                latestCode = Number(student.code);

                config.log('query result:');
                config.log(student);

            } else if (!student){ // if found no student was found -> handling first student with chosen grade
                latestCode = temp;
            }
        });


    if (issue) return;

    config.log('returning: ' + Number(latestCode) + 1)

    return (Number(latestCode) + 1);
}// done


async function editStudent(req, res, next) {

    let params = req.body;

    let issue = validator.addStudent(req, res);
    if(issue) return;

    let query = {code: params.code};

    let student = {
        firstName: params.firstName,
        lastName: params.lastName,
        grade: params.grade,
        field: params.field,
        phone: params.phone,
        home: params.home,
        school: params.school
    };

    // The upsert = true option creates the object if it doesn't exist.
    await Student.findOneAndUpdate(query, student, {upsert:false}, function(err, student){

        if (err) {
            errHandler(err, res);

        } else if (!student) {
            res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
        } else {

            res.status(consts.SUCCESS_CODE).send('OK');
        }
    });

}//done

async function deleteStudent(req, res, next) {

    let params = req.body;

    let issue = validator.hasCode(req, res, params);
    if (issue) return;


    let inviterId;
    let gifts;
    let purchases;

    let query = { // must cast this shit to Number
        code: Number(params.code)
    };

    config.log(`code type of: ${typeof (query.code)}`);

    // find student to get inviterId
    let studentToDelete = await Student.findOne(query, function(err, student) {

        if (err) { // if there were errors running query
            errHandler(err, res);
            issue = true;

        } else if (!student) { // if found no student

            res.status(consts.BAD_REQ_CODE).json({error: consts.INCORRECT_MAHTA_ID});
            issue = true;

        } else { // if found student

            // check if had inviter
            if (student.inviter)    inviterId = student.inviter;
            // check if had gifts
            if (student.gifts.length !== 0)    gifts = student.gifts;
            // check if had purchases
            if (student.purchases.length !== 0)    purchases = student.purchases;
        }
    });

    if (issue) return;


    // if student had inviter
    if (inviterId) {

        // find inviter
        await Student.findOne({_id:inviterId}, function(err, student) {

            if (err) {
                errHandler(err, res);
                issue = true;

            } else if (!student) { // if found no inviter

                config.log(`Could not find student's inviter`)

            } else { // if found inviter, delete id from inviteds array

                for( let i = 0; i < student.inviteds.length; i++){

                    if (student.inviteds[i].equals(studentToDelete._id))
                        student.inviteds.splice(i, 1);
                }

                // saving inviter
                student.save(err => {
                    if (err) {

                        errHandler(err);
                        issue = true;

                    } else {
                        config.log(`inviter's property updated`);
                    }
                })
            }
        });
    }

    if (issue) return;

    // if student had gifts
    if (gifts) {
        await giftHandler.deleteGifts(studentToDelete._id);
    }

    // if student had purchases
    if (purchases) {
        await purchaseHandler.deletePurchases(studentToDelete._id);
    }

    // remove student
    await Student.deleteOne(studentToDelete ,(err, student) => {

        if (err) {
            errHandler(err, res);

        } else {
            res.status(consts.SUCCESS_CODE).send("OK")
        }
    });
}//done

async function getGPList(req, res, next) {

    let params = req.body;
    let issue = false;
    let gifts;
    let purchases;

    let studentId;

    let response = {
        gifts : [],
        purchases : []
    };

    query = {
        code: params.code
    };

    let student = await Student.findOne(query, function(err, student) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        } else { // if found student

        }
    });

    if (issue) return;

    console.log('student: ' + student);


    gifts = student.gifts;
    purchases = student.purchases;
    studentId = student._id;


    // if student had gifts
    if (gifts) {
        await giftHandler.getGifts(studentId, response);
    }

    // if student had purchases
    if (purchases) {
        await purchaseHandler.getPurchases(studentId, response);
    }

    res.status(consts.SUCCESS_CODE)
        .json(response);

}

async function spendCredit(req, res, next) {

    let params = req.body;

    let code = Number(params.code);
    let price = Number(params.price);

    let issue = validator.spendCredit(req, res);

    if(code === "" || code <= 0){
        res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
        return;
    }

    if(price <= 0){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PRICE});
        return;
    }

    query = {code: code};

    await Student.findOne(query, function(err, student) {

        if (err) {
            errHandler(err, res);
            issue = true;

        } else if (!student) { // if found no student

            res.status(consts.NOT_FOUND_CODE).json({error: consts.INCORRECT_MAHTA_ID});
            issue = true;

        } else { // if found student

            // if student's credit was not enough
            if (student.credit < price) {
                res.status(consts.BAD_REQ_CODE).json({error: consts.CREDIT_NOT_ENOUGH});
                return;
            }

            student.credit -= price;

            student.save((err => {

                if (err) {
                    errHandler(err, res);
                    return;
                }

                res.status(consts.SUCCESS_CODE).send("OK");
            }));

        }
    });
}


async  function groupCommit(req, res, next) {

    let params = req.body;
    let issue = validator.groupCommit(req, res);

    if (issue) return;

    let start = Number(params.start);
    let number = Number(params.number);
    let gift = Number(params.gift);

    await Student.find({ code: { $gt: start , $lt: start + number + 1 }},
        function(err, result) {

            if (err) {
                issue = true;
                errHandler(err);

            } else if (result.length === 0) { // if codes were empty
                config.log(`codes were available`);

            } else { // if codes were not available

                issue = true;
                config.log(`codes were not available`);
                res.status(consts.BAD_REQ_CODE).json({error: consts.STUDENTS_NOT_AVAILABLE});

            }
        });

    if (issue) return;

    let array = [];

    for (let i = 0; i < number; i++) {
        array.push({code: start + i, gift: gift})
    }

    await Student.insertMany(array, function(err, docs) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (docs.length === 0) {


        } else {
            res.status(consts.SUCCESS_CODE).json({error: 'OK'});
        }

    });


}

module.exports = {getStudentList, addStudent, editStudent, deleteStudent, getGPList, spendCredit, groupCommit};
