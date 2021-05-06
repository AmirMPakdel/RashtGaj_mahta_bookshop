let isDevelopment = (process.env.NODE_ENV === 'development');
let hostAddress = (isDevelopment)? '0.0.0.0' : '127.0.0.1';
let database = 'mongodb://localhost:27017/mahta';

const publicVapidKey =
  "BFK4CAr3kSmUtb_rq2yBP4KE3XpTsYLNZal1uwPd0mUDzSjcgaAKRJixFH_0Pv0v2jLIw5a6TxBd6RPUCkL5aYU";
const privateVapidKey = "rMkJ0VQMtOZkRV7TsNb3PCQ2QDhaI_U55MbYX74CQXw";

function log (message) {
    if (isDevelopment)
        console.log(message);
}

module.exports = {
    isDevelopment,
    hostAddress,
    database,
    log,
    publicVapidKey,
    privateVapidKey
};