const express = require('express');
const router = express.Router();
const calanderController = require('../controllers/calander');
const AuthMiddleware = require('../middlewares/auth');

/*전체 수업 일정 조회 get : [ / ]*/
router.get('/', AuthMiddleware.checkToken, calanderController.getAll);

/*특정 수업 일정 조회 get : [ /:lid ]*/
router.get('/:lid', AuthMiddleware.checkToken, calanderController.getLecture);

/*일정 추가 post : [ /class ]*/
router.post('/class', AuthMiddleware.checkToken, calanderController.createClass);

/*상세 일정 조회 get : [ /class/:cid ]*/
router.get('/class/:cid', AuthMiddleware.checkToken, calanderController.getClass);

/*일정 수정 put : [ /class/:cid ]*/
router.put('/class/:cid', AuthMiddleware.checkToken, calanderController.putClass); 

/*일정 삭제 delete : [ /class/:cid ]*/
router.delete('/class/:cid', AuthMiddleware.checkToken, calanderController.deleteClass);

module.exports = router;