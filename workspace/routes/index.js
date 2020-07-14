var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'TutorDot'
    });
});

// 계정
router.use('/user', require('./user'));

// 수업 관리
router.use('/lecture', require('./lecture'));

// 캘린더
router.use('/calander', require('./calander'));

// 수업일지
router.use('/diary', require('./diary'));

// 알림
//router.use('/notice', require('./notice'));

module.exports = router;