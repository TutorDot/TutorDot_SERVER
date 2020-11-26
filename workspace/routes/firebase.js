const express = require('express');
const router = express.Router();
const FireBaseController = require('../controllers/firebase');
const AuthMiddleware = require('../middlewares/auth');


//클라 코드 삽입
router.post('/', FireBaseController);

//클라 코드 조회
router.get('/', FireBaseController);