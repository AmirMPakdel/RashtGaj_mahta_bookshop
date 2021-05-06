const fs = require('fs');
const mongoose = require('mongoose');

let Student = require('../models/student');

let students = JSON.parse(fs.readFileSync('convertcsv.json', 'utf8'));

/*
 TODO: get the xlsx file change column names to english then convert it to txt -> csv -> json
 can not access object values with persian keys
  */


for (let student in students) {

    console.log(students[student]);

    new Student({
        _id: new mongoose.Types.ObjectId(),
        code: students[student]['کد خانواده'],
        // firstName: 'نام',
        // lastName: 'نام خانوداگی',
        // grade: 'رشته',
        // field: 'پایه',
        // phone: 'تلفن همراه'
    })
        .save((err) => {
            if (err) console.log(err);
            else console.log(`student added`)
        });

}