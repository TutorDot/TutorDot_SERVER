const express = require("express");
const router = express.Router();
const NoticeController = require("../controllers/notice");
const AuthMiddleware = require("../middlewares/auth");

// 알림 전체 목록 조회
router.get('/', AuthMiddleware.checkToken, NoticeController.getAll);

// 알림 상세 목록 조회
router.get('/:lid', AuthMiddleware.checkToken, NoticeController.getNoticeId);

module.exports = router;