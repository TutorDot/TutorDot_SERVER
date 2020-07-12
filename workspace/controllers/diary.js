const DiaryModel = require('../models/diary');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

const Diary = {

    //전체 수업일지 조회
    getAll: async (req, res, next) => {
        const userIdx = req.decoded.userId;
        const Diaries = await DiaryModel.getAll(userIdx);
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CHECK_TOTAL_DIARY_SUCCESS, Diaries));
    },

    // 특정 수업일지 조회
    getDiaryBylIdUserIdx: async (req, res) => {
        const userIdx = req.decoded.userId;
        const {
            lid
        } = req.params;

        // id에 해당하는 게시글이 없다면
        const Diaries = await DiaryModel.getDiaryBylIdUserIdx(userIdx, lid);
        if (Diaries.length === 0) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_LECTURE));
        }

        // 게시글 조회 성공
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CHECK_SPECIFIC_DIARY_SUCCESS, Diaries));
    },

    //수업 일지 수정 
    updateDiary: async (req, res) => {
        //url뒤에 붙은 파라미터값
        const {
            did
        } = req.params;
        const {
            classProgress,
            homework,
            hwPerformance
        } = req.body;

        // if (!hwPerformance || !classProgress || !homework) {
        //     // 게시글 수정 성공
        //     res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CHANGE_SPECIFIC_DIARY_SUCCESS));
        // }

        // //hwPerformance값이 1,2,3이 아닌 값이 올 경우
        // if (hwPerformance !== 1 || hwPerformance !== 2 || hwPerformance !== 3) {
        //     return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.HWPERFORMANCE_VALUE));
        // }

        // did에 해당하는 게시글이 없다면(잘못된 did값)
        const Diary = await DiaryModel.getDiaryById(did);

        if (Diary.length === 0) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_DIARY));
        }

        const update = await DiaryModel.updateDiary(did, classProgress, homework, hwPerformance);

        // 수정 실패
        if (update === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        // 게시글 수정 성공
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CHANGE_SPECIFIC_DIARY_SUCCESS));
    },
    getDiaryBar: async (req, res) => {

        const userIdx = req.decoded.userId;
        const {
            lid
        } = req.params;

        // id에 해당하는 게시글이 없다면
        const Diaries = await DiaryModel.getDiaryBar(userIdx, lid);
        if (Diaries.length === 0) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_LECTURE));
        }

        // bar 확인 조회 성공
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.BAR_GRAPH_SUCCESS, Diaries));
    }

}

module.exports = Diary;