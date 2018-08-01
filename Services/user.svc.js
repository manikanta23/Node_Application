
const User = require('../Models/user.model');

class UserService {

    register(data) {
        var user = new User(data);
        return user.save();
    }

    getUserDetails(userName){
        return User.findOne({UserName: userName},{_id:0, Password:1}).exec();
    }
}

module.exports = new UserService();