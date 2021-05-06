const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const webpush = require("web-push");

const config = require('./config/config');

const School = require('./models/school');

webpush.setVapidDetails(
  "mahtaAdmin:test@test.com",
  config.publicVapidKey,
  config.privateVapidKey
);

mongoose.connect(config.database, { useNewUrlParser: true });

let db = mongoose.connection;

// Check DB connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(`DB Error: ${err}`);
});

const app = express();

// Body Parser MiddleWare
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(cookieParser());

if (config.isDevelopment) {
    console.log(`We're on developement :)`);

    // const cors = require('cors');
    // app.use(cors());

    // app.use(cors({
    //     origin: 'http://localhost:3005',
    //     credentials: true,
    //     exposedMethods: ['Content-Length', 'Options']
    // }));



    // for fuck's sake we dont need these configuration on online server
    // Access Control Allow configuration
    // with this configuration both first Option req and next req statuses would be 200 OK :)
    app.use(function(req, res, next) {

        // res.header('Access-Control-Allow-Origin', 'http://localhost:3005');
        // res.header('Access-Control-Allow-Credentials', true);
        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        next();
    });
}



// TODO: comment this if you don't need test samples
const faker = require('./tools/faker');
faker.insertFakeAdmin();
// faker.insertFakeStudents();
faker.insertFakeSchools();






// Route Files
let users = require('./routes/users');
app.use('/api/admin', users);

// just for fun :)
app.get('/api/info', (req, res) => {

    res.send(req.headers);

    // let Student = require('./models/student');
    //
    // Student.find({}).sort({created: -1}).find(function(err,docs){
    //
    //     res.send(docs)
    // });

});


const port = 4000;

app.listen(port, config.hostAddress, () => config.log(`Server Started on port ${port}`));