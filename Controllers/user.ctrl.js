
const UserService = require('../Services/user.svc');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

class UserControl {
    

    async register(req, res) {
        try {
            let hashedPwd = bcrypt.hashSync(req.body.Password, 2);
            req.body.Password = hashedPwd;

            await UserService.register(req.body);
            res.status(200).send("Successfully Saved.");

        }
        catch (error) {
            console.log(error);
        }
    }

    async login(req, res) {
        let userDetails = await UserService.getUserDetails(req.body.UserName);
        let result = bcrypt.compare(req.body.Password, userDetails.Password);

        if(result) {

            let token = jwt.sign({ UserName : req.body.UserName },config.jwtPassword, { expiresIn : '4h'});

            var response = {
                UserName: req.body.UserName,
                Token: token
            }
            res.status(200);
            res.json(response);
        } else {
            res.status(401).send('UnAuthorized');
        }
    }
}

module.exports = new UserControl();