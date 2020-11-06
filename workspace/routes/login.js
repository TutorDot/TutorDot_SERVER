const express = require('express');
const router = express.Router();
let passport = require('passport');
const UserController = require("../controllers/user");
const NaverStrategy = require('passport-naver').Strategy;
const authService = require('../services/authService');
const passportKey = require('../config/passportKey');

passport.use(new NaverStrategy({
    clientID: passportKey.federation.naver.client_id,
    clientSecret: passportKey.federation.naver.secret_id,
    profileFields: ['nickname', 'id'],
    callbackURL: passportKey.federation.naver.callback_url
},
    async (accessToken, refreshToken, profile, done) => {
        const email = 'naver:' + profile.id;
        const nickname = profile.nickname;
        const user = await authService.findOrCreate(nickname, email);
        done(null, user);
    }
));

/* localhost:3000/login/naver : 네이버 로그인 화면
    localhost:3000/login : signup한 결과 출력
    login/naver/find/:role : 역할을 받아서 공백에서 역할 교체 */

router.get('/', (req, res) => {
    const data = req.user;
    console.log('data : ', data);
    res.send(data);
});

router.get('/naver', passport.authenticate('naver'));

router.put('/naver/find/role', UserController.socialGetAll);

router.get('/naver/callback', passport.authenticate('naver', {
    successRedirect: '/login',
    failureRedirect: '/calander'
}));

module.exports = router;