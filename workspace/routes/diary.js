const express = require('express');
const router = express.Router();
const DiaryController = require('../controllers/diary');
const AuthMiddleware = require('../middlewares/auth');



//전체 수업일지 조회
router.get('/', AuthMiddleware.checkToken, DiaryController.getAll);

//특정 수업일지 조회
router.get('/:lid', AuthMiddleware.checkToken, DiaryController.getDiaryBylIdUserIdx);

//수업 일지 수정
router.put('/hw/:did', AuthMiddleware.checkToken, DiaryController.updateDiary);

//과외 시간 달성률(막대그래프)
router.get('/bar/:lid', AuthMiddleware.checkToken, DiaryController.getDiaryBar);


module.exports = router;