const express = require('express');
const router = express.Router();
const calanderController = require('../controllers/calander');
const AuthUtil = require('../middlewares/auth')

/*전체 수업 일정 조회 get : [ / ]*/
//AuthUtil.checkToken 나중에 middleware 추가하기
router.get('/', calanderController.getAll);

/*특정 수업 일정 조회 get : [ /:lid ]*/
//AuthUtil.checkToken 나중에 middleware 추가하기
router.get('/:lid', calanderController.getLecture);

// /*일정 추가 post : [ /class ]*/
//AuthUtil.checkToken 나중에 middleware 추가하기
//router.post('/class', calanderController.createClass);

// /*상세 일정 조회 get : [ /class/:cid ]*/
// router.get('/class/:cid', AuthUtil.checkToken, calanderController.getClass);

// /*일정 수정 put : [ /class/:cid ]*/
// router.put('/class/:cid', AuthUtil.checkToken, calanderController.putClass); 

// /*일정 삭제 delete : [ /class/:cid ]*/
// router.delete('/class/:cid', AuthUtil.checkToken, calanderController.deleteClass);

module.exports = router;