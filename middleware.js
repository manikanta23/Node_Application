
const jwt = require('jsonwebtoken');
const config = require('./config');


module.exports = {
    tokenAuth : function (req, res, next) {
        const token = req.headers["authorization"];

     jwt.verify(token, config.jwtPassword, function(err){
            if(err) {
                res.status(401).send("Un Authorized");
            } else {
                next();
            }
        });
      
    }
    
};