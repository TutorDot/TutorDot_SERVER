const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question');
const AuthMiddleware = require('../middlewares/auth');

/*특정 수업 질문 조회 get : [ /:lid ]*/
router.get('/:lid', AuthMiddleware.checkToken, questionController.getLecture);

/*상세 질문 조회 get : [ /:qid ]*/
router.get('/question/:qid', AuthMiddleware.checkToken, questionController.getQuestion);

module.exports = router;