const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');


/* 
    ✔️ sign up
    METHOD : POST
    URI : localhost:3000/user/signup
    REQUEST BODY : userName, role, password, email
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/

module.exports = {
    signup: async (req, res) => {
        const {
            userName,
            password,
            email,
            role
        } = req.body;
        if (!userName || !password || !email || !role) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }
        // 사용자 중인 아이디가 있는지 확인
        if (await UserModel.checkUser(email)) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.ALREADY_ID));
            return;
        }

        const {
            salt,
            hashed
        } = await encrypt.encrypt(password);

        const idx = await UserModel.signup(userName, email, hashed, salt, role);

        if (idx === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        res.status(CODE.OK)
            .send(util.success(CODE.NO_CONTENT, MSG.CREATED_USER));
    },

            /*소셜로그인 역할까지 수정한 후 네이버 소셜 로그인 완료하기*/
            socialGetAll: async (req, res) => {
                const role = req.body;
                const email = req.body;
                const rolechange = await UserModel.updateRole(email, role);

                if (!email || !role) {
                    res.status(CODE.BAD_REQUEST)
                        .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
                    return;
                }
                // 사용자 중인 아이디가 있는지 확인
                if (await UserModel.checkUser(email)) {
                    res.status(CODE.BAD_REQUEST)
                        .send(util.fail(CODE.BAD_REQUEST, MSG.ALREADY_ID));
                    return;
                }
                // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
            res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.LOGIN_SUCCES, rolechange[0]));
    },
    /* 
        ✔️ sign in
        METHOD : POST
        URI : localhost:3000/user/signin
        REQUEST BODY : email, password
        RESPONSE STATUS : 200 (OK)
        RESPONSE DATA : User ID
    */
    signin: async (req, res) => {
        const {
            email,
            password
        } = req.body;

        //request data 확인 - 없다면 NUll value 반환
        if (!email || !password) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }

        // User의 이메일 계정이 있는지 확인 - 없다면 NO_USER 반납
        const user = await UserModel.getUserById(email);
        if (user[0] === undefined) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_USER));
        }
        //req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        if (hashed !== user[0].password) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.MISS_MATCH_PW));
        }
        const role = await UserModel.getUserByRole(email);
        const userName = await UserModel.getUserByUserName(email);
        //jwt 생성
        const {
            token,
            refreshToken}
        = await jwt.sign(user[0]);

        // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
            res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.LOGIN_SUCCESS,{
                accessToken:token,
                role:role[0].role,
                userName:userName[0].userName
            }
            ));
    },
    readProfile: async (req, res) => {

        const userIdx = req.decoded.userId;

        const dataAll = await UserModel.readProfile(userIdx);

        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.READ_PROFILE_SUCCESS,
                dataAll[0]
            ));
    },

    updateProfile: async (req, res) => {
        // 데이터 받아오기
        const {
            intro
        } = req.body;

        const profileImg = req.file ? req.file.location : ""
        const userIdx = req.decoded.userId; //jwt를 decoded시켜주는것이 체크토큰을 가지고오는것
        //const profileImg = await req.file.location;
        // data check - undefined
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        if (req.file) {
            // image type check
            const type = req.file.mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
                return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.UNSUPPORTED_TYPE));
            }
        }

        // call model - database
        const result = await UserModel.updateProfile(userIdx, profileImg, intro);
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.CHANGE_PROFILE_SUCCESS, result[0]));
    },

    deleteUser: async (req, res) => {
        const userIdx = req.decoded.userId; //jwt를 decoded시켜주는것이 체크토큰을 가지고오는것
        // data check - undefined
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        // call model - database
        const result = await UserModel.deleteUser(userIdx);
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.EXIT_SERVICE_SUCCESS));
    }


}
