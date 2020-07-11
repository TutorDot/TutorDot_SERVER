const Calander = require('../models/calander');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

const calander = {
    /*전체 수업 일정 조회 get : [ / ]*/
    getAll: async (req, res) => {
        const classes = await Calander.getAll();
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_TOTAL_LECTURE_SUCCESS, classes));
    },

    /*특정 수업 일정 조회 get : [ /:lid ]*/
    getLecture: async (req, res) => {
        const lectureIdx = req.params.lid;
        const classes = await Calander.getLecture(lectureIdx);

        if (!lectureIdx) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.LID_NULL_VALUE));
        }

        let lidExists = await Calander.checkLid(lectureIdx);
        if (!lidExists) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_LECTURE));
        }

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_SPECIFIC_LECTURE_SUCCESS, classes));
    }

    // /*일정 추가 post : [ /class ]*/
    // createClass: async (req, res) => {
    //     const {
    //         lectureId,
    //         date,
    //         startTime,
    //         endTime,
    //         location
    //     } = req.body;

    //     //데이터 값이 없으면 - NULL_VALUE
    //     if (!lectureId || !date) {
    //         return res.status(statusCode.BAD_REQUEST)
    //             .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    //     }

    //     //일정 생성
    //     const idx = await Calander.createClass(lectureId, date, startTime, endTime, location);
    //     if (idx === -1) {
    //         return res.status(statusCode.DB_ERROR)
    //             .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    //     }

    //     res.status(statusCode.NO_CONTENT)
    //         .send(util.success(statusCode.NO_CONTENT, resMessage.ADD_LECTURE_SUCCESS));
    // }

    // /*상세 일정 조회 get : [ /class/:cid ]*/
    // getClass: async (req, res, next) => {

    // }

    // /*일정 수정 put : [ /class/:cid ]*/
    // putClass: async (req, res, next) => {

    // }

    // /*일정 삭제 delete : [ /class/:cid ]*/
    // deleteClass: async (req, res, next) => {

    // }

}

module.exports = calander;