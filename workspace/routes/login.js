const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
let passport = require('passport');
const jwt = require('../modules/jwt');
const UserController = require("../controllers/user");

const NaverStrategy = require('passport-naver').Strategy;
const authService = require('../services/authService');
const passportKey = require('../config/passportKey');

router.use(passport.initialize());
passport.use(new NaverStrategy({
    clientID: passportKey.federation.naver.client_id,
    clientSecret: passportKey.federation.naver.secret_id,
    profileFields: ['id', 'displayName'],
    callbackURL: 'http://localhost:3000/login/naver/callback'
},
async (accessToken, refreshToken, profile, done) => {
    const email = 'naver:' + profile.id;
    const nickname = profile.displayName;
    const user = await authService.findOrCreate(email, nickname);
    done(null, user);
}
));

router.get('/', (req, res) => {
    const data = req.user;
    res.send(data);
});

router.get('/naver', passport.authenticate('naver'));

router.put('/naver/find/:role', UserController.socialGetAll);

router.get('/naver/callback', passport.authenticate('naver', {
    session: false,
    failureRedirect: '/',
    successRedirect: '/login'
}));

module.exports = router;