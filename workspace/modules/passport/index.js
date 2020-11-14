const kakao = require('./kakao');
const User = require('../../models/user');
const passport = require('passport');

passport.serializeUser((user, done) => {
    console.log('serializeUser', user.id);
    // done 의 두 번째 인자로 user를 구분해줄 수 있는 값인 id를 넣어줌
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // 다시 들어오면 serializeUser의 done 의 두 번째 인자로 넘어온 id를 첫 번째 인자로 받아 사용
    console.log('deserializeUser', id);
    User.getUserById(id).then(user=>done(null,user)).catch(err=>done(err))
});
kakao;