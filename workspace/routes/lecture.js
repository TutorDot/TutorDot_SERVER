/* 수업관리 라우트 파일 */
const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lecture');
const AuthUtil = require('../middlewares/auth');

/* 수업 추가  post : [ /lecture ] */
router.post('/', AuthUtil.checkToken, lectureController.createLecture);

/* 수업 목록 조회  get : [ /lecture ] */
router.get('/', AuthUtil.checkToken, lectureController.getLectureAll);

/* 수업 목록 조회  get : [ /lecture/name ] */
router.get('/name', AuthUtil.checkToken, lectureController.getLectureNames);

/* 수업 상세 조회  get : [ /lecture/:lid ] */
router.get('/:lid', AuthUtil.checkToken, lectureController.getLectureById);

/* 수업 정보 수정  put : [ /lecture/:lid] */
router.put('/:lid', AuthUtil.checkToken, lectureController.updateLecture);

/* 수업방 나가기  delete : [ /lecture/:lid ] */
router.delete('/:lid', AuthUtil.checkToken, lectureController.deleteConnection);

/* 수업방 연결  post : [ /lecture/invitation ] */
router.post('/invitation', AuthUtil.checkToken, lectureController.createConnection);

/* 수업 초대  get : [ /lecture/invitation/:lid ] */
router.get('/invitation/:lid', AuthUtil.checkToken, lectureController.getCode);


module.exports = router;