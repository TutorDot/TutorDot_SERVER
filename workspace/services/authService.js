const UserController = require('../controllers/user');
const UserModel = require('../models/user');
var JWT_SECRET = "sasas465s5ad"
var jwt = require('jsonwebtoken');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');

module.exports = {
    findOrCreate: async (email, nickname) => {
        try {
            const isThere = await UserModel.getUserById(email);
            const user = {
                email: email,
                name: nickname,
                state: 0
            }
            if (isThere) {
                console.log('user가 없습니다');
                await UserModel.signup(nickname, email, '  ',  '  ', ' ');
                user.state = 1;

        // //jwt 생성
        // const {
        //     token,
        //     refreshToken}
        // = await jwt.sign(user[0]);

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
