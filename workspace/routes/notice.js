const express = require("express");
const router = express.Router();
const fireBaseController = require("../controllers/firebase");
const AuthMiddleware = require("../middlewares/auth");

// // 알림 전체 목록 조회
// router.get('/', AuthMiddleware.checkToken, NoticeController.getAll);

// // 알림 상세 목록 조회
// router.get('/:lid', AuthMiddleware.checkToken, NoticeController.getNoticeId);

// // 수업일지가 추가되었습니다.
// router.get('/addlecture', AuthMiddleware.checkToken, NoticeController.getNoticeId);

// 파이어베이스 코드 집어넣기
router.post('/insertCode', AuthMiddleware.checkToken, fireBaseController.insertCode);

// 파이어베이스 수업 일지 업데이트 푸시 알림 보내기
router.post('/updateDiary',AuthMiddleware.checkToken,  fireBaseController.updateDiary);


module.exports = router;