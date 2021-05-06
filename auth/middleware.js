const jwt = require('jsonwebtoken');
const secret = 'mysecretboozboozak';

const consts = require('../utils/consts');

const withAuth = function(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    // console.log("no token");
    
    res.status(consts.UNAUTHORIZED_CODE).send('Unauthorized: No token provided');

  } else {

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {

        // console.log("invalid token");
        
        res.status(consts.UNAUTHORIZED_CODE).send('Unauthorized: Invalid token');

      } else {
        // console.log("valid token");
        
        req.username = decoded.username;
        next();

      }
    });
  }
};

module.exports = withAuth;