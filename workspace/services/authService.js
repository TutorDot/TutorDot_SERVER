const UserController = require('../controllers/user');
const UserModel = require('../models/user');
// var jwt = require('jsonwebtoken');
// const util = require('../modules/util');
// const CODE = require('../modules/statusCode');
// const MSG = require('../modules/responseMessage');

module.exports = {
    findOrCreate: async (nickname, email) => {
        try {
            const isThere = await UserModel.getUserById(email);
            const user = {
                userName: nickname,
                email: email,
                state: 0
            }
            if (isThere) {
                console.log('user가 없습니다');
                await UserModel.signup(userName, email,  ' ', ' ', ' ');
                user.state = 1;
        } else {
                console.log('user가 있습니다');
                user.state = 2;
        }
            return user;
        } catch {
            return false;
        }
    }
}
