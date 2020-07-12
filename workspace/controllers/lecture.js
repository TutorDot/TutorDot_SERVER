const Lecture = require('../models/lecture');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');


const lecture = {

    // 시간 계산
    calcHour: async (startTime, endTime) => {
        let int_startTime = startTime.substr(5) === "pm" ? parseInt(startTime.substr(0, 2)) + 12 : parseInt(startTime.substr(0, 2))
        let int_endTime = endTime.substr(5) === "pm" ? parseInt(endTime.substr(0, 2)) + 12 : parseInt(endTime.substr(0, 2))
        return int_endTime - int_startTime;
    },

    // class 디비에 일정 자동 추가
    createCnDAuto: async (schedules, lectureId, orgLocation, totalHours) => {

        let timeTable = {}
        for (let schedule of schedules) {
            const {
                day,
                orgStartTime,
                orgEndTime
            } = schedule;
            timeTable[day] = [orgStartTime, orgEndTime]
        }
        console.log(timeTable);

        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const today = new Date()

        let cnt = 0;
        let curDate = new Date(today);
        let curDay = week[new Date(curDate).getDay()];
        let times = 1;
        while (cnt < totalHours) {
            //console.log(cnt)
            // 현재 요일과 입력 요일이 같다면
            if (Object.keys(timeTable).includes(curDay)) {

                // 시간 계산
                const hour = await lecture.calcHour(timeTable[curDay][0], timeTable[curDay][1])
                //console.log(hour)
                cnt += hour

                // 디비에 일정 추가
                const classId = await Lecture.createClassAuto(timeTable[curDay][0], timeTable[curDay][1], hour, times, orgLocation, curDate.toISOString().slice(0, 10), lectureId)
                if (classId === -1) {
                    return res.status(CODE.DB_ERROR)
                        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
                }

                // 디비에 일지 추가
                const diaryId = await Lecture.createDiaryAuto(lectureId, classId)
                if (diaryId === -1) {
                    return res.status(CODE.DB_ERROR)
                        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
                }

                // 회차 증가
                times++;
            }

            // 다음 날 탐색
            curDate.setDate(curDate.getDate() + 1)
            curDay = week[new Date(curDate).getDay()];

        }
    },

    /* 수업 추가  post : [ /lecture ] */
    createLecture: async (req, res) => {

        const userIdx = req.decoded.userId;
        console.log(userIdx);

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

        // 디폴트 스케줄 있을 때 class 디비에 일정 자동 추가
        if (schedules.length !== 0) {
            lecture.createCnDAuto(schedules, lectureId, orgLocation, totalHours)
        }

        // 수업 연결
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        const conId = await Lecture.createConnect(userIdx, lectureId);
        console.log(conId)
        if (conId === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
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

        const userIdx = req.decoded.userId;
        console.log(userIdx);
        const {
            code
        } = req.body;

        // 코드 없음
        if (!code) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_CODE));
            return;
        }

        // 해당 수업이 없을 때
        const result = await Lecture.checkCode(code)
        if (result.length === 0) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_LECTURE_CODE));
            return;
        }
        const lectureId = result[0].lectureId

        // 수업 연결
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        const conId = await Lecture.createConnect(userIdx, lectureId);
        console.log(conId)
        if (conId === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }

        // ** 수업 방 연결 성공 **
        res.status(CODE.OK)
            .send(util.success(CODE.NO_CONTENT, MSG.INVITATION_CONNECT_SUCCESS));


    },

    /* 수업 초대  get : [ /lecture/invitation/:lid ] */
    getCode: async (req, res) => {

        const {
            lid
        } = req.params;
        console.log(lid)
        const code = await Lecture.getCodeById(lid)
        // 수업 아이디 확인
        if (code.length === 0) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_LECTURE));
            return;
        }

        // 초대 정보 불러오기 성공
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.INVITATION_SUCCESS, code[0]));

    }

}


module.exports = lecture;