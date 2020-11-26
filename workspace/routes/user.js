const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');
const imageController = require('../controllers/image.js');

//회원가입
router.post('/signup', UserController.signup);

//로그인
router.post('/signin', UserController.signin);

//로그인 중복 확인
router.post('/signin/duplication', UserController.signinDuplication);

//간편 프로필 조회
router.get('/profile', AuthMiddleware.checkToken, UserController.readProfile);

//간편 프로필 수정
router.put('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);

//서비스 탈퇴
router.delete('/profile', AuthMiddleware.checkToken, UserController.deleteUser);

// router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);
// router.post('/selfies', AuthMiddleware.checkToken, upload.array('images', 1), imageController.array);
module.exports = router;