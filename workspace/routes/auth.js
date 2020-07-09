// auth 파일은 수정해야 할수도...
//git 연습
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

router.get('/local', AuthController.localVerify);
router.get('/local/reissue', AuthController.localReIssue);

module.exports = router;