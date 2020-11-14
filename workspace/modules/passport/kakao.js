const KakaoStrategy = require('passport-kakao').Strategy;
const passport = require('passport');
const User = require('../../models/user');
const passportKey = require('../../config/passportKey');

passport.use(new KakaoStrategy({
    clientID:passportKey.kakao.ID,
    callbackURL:'user/kakao/callback',
}, 

async (accessToken, refreshToken, profile, done) => {
    const socialId = 'kakao:' + profile.id;
    const nickname = profile.displayName;
    const email = profile.emails[0].value;
    const user = await User.findOrCreate(socialId, nickname, email);
    done(null, user);
}
));