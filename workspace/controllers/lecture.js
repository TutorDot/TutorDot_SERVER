const Lecture = require('../models/lecture');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');

const lecture = {

    /* 수업 추가  post : [ /lecture ] */
    createLecture: async (req, res) => {

        const {
            lectureName,
            color,
            schedules,
            orgLocation,
            bank,
            accountNumber,
            totalHours,
            price
        } = req.body;

        // 데이터 값이 없으면 - NULL_VALUE
        if (!lectureName || !totalHours || !price) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }

        // 수업 중복
        if (await Lecture.checkLecture(lectureName)) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.REPEAT_LECTURE_NAME));
            return;
        }

        // 수업 추가
        const lectureId = await Lecture.createLecture(lectureName, color, orgLocation, bank, accountNumber, totalHours, price);
        if (lectureId === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }

        // 수업 스케줄 셋팅 자동 추가
        for (let schedule of schedules) {
            const {
                day,
                orgStartTime,
                orgEndTime
            } = schedule;
            const scheduleId = await Lecture.setSchedule(day, orgStartTime, orgEndTime, lectureId)
            if (scheduleId === -1) {
                return res.status(CODE.DB_ERROR)
                    .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
            }
        }

        // ** 수업 방 개설 성공 **
        res.status(CODE.OK)
            .send(util.success(CODE.NO_CONTENT, MSG.ADD_LECTURE_SUCCESS));

    },

    /* 수업 목록 조회  get : [ /lecture ] */
    getLectureAll: async (req, res) => {

    },

    /* 수업 상세 조회  get : [ /lecture/:lid ] */
    getLectureById: async (req, res) => {

    },

    /* 모든 게시글 조회  put : [ /lecture/:lid] */
    updateLecture: async (req, res) => {

    },

    /* 토글 수업목록 조회  get : [ /toggle ] */
    getLectureNames: async (req, res) => {

    },

    /* 수업방 나가기  delete : [ /lecture/:lid ] */
    deleteConnection: async (req, res) => {

    },

    /* 수업방 연결  post : [ /lecture/invitation ] */
    createConnection: async (req, res) => {

    },

    /* 수업 초대  get : [ /lecture/invitation/:lid ] */
    getCode: async (req, res) => {

    }

}


module.exports = lecture;