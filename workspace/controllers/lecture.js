const Lecture = require("../models/lecture");
const util = require("../modules/util");
const CODE = require("../modules/statusCode");
const MSG = require("../modules/responseMessage");

const lecture = {
    // 시간 계산
    calcHour: async (startTime, endTime) => {
        let int_startTime =
            startTime.substr(5) === "pm" ? parseInt(startTime.substr(0, 2)) + 12 : parseInt(startTime.substr(0, 2));
        let int_endTime = endTime.substr(5) === "pm" ? parseInt(endTime.substr(0, 2)) + 12 : parseInt(endTime.substr(0, 2));
        return int_endTime - int_startTime;
    },

    DateToFormattedString: async (d) => {
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = d.getDate().toString();
        return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
    },

    // class 디비에 일정 자동 추가
    createCnDAuto: async (doneTimes, count, schedules, lectureId, orgLocation, totalHours) => {
        let timeTable = {};
        for (let schedule of schedules) {
            const {
                day,
                orgStartTime,
                orgEndTime
            } = schedule;
            timeTable[day] = [orgStartTime, orgEndTime];
        }

        const week = ["일", "월", "화", "수", "목", "금", "토"];
        let cnt = count;
        let curDate = new Date()
        //console.log('wwww', new Date().toString())
        // curDate.setHours(curDate.getHours() + 9)
        let index = curDate.getDay()
        let curDay = week[index];
        let times = doneTimes + 1;
        while (cnt < totalHours) {
            //console.log(cnt)
            //console.log('c', curDate, curDay)
            // 현재 요일과 입력 요일이 같다면
            if (Object.keys(timeTable).includes(curDay)) {
                let date = await lecture.DateToFormattedString(curDate)
                //console.log(cnt, totalHours)
                // 시간 계산
                const hour = await lecture.calcHour(timeTable[curDay][0], timeTable[curDay][1]);
                //console.log(hour)
                cnt += hour;

                // 디비에 일정 추가
                const classId = await Lecture.createClassAuto(
                    timeTable[curDay][0],
                    timeTable[curDay][1],
                    hour,
                    times,
                    orgLocation,
                    date,
                    lectureId
                );
                if (classId === -1) {
                    return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
                }

                // 디비에 일지 추가
                const diaryId = await Lecture.createDiaryAuto(lectureId, classId);
                if (diaryId === -1) {
                    return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
                }

                // 회차 증가
                times++;
            }

            // 다음 날 탐색
            curDate.setDate(curDate.getDate() + 1);
            curDay = week[curDate.getDay()];
        }
    },

    /* 수업 추가  post : [ /lecture ] */
    createLecture: async (req, res) => {
        const userIdx = req.decoded.userId;
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
            res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }

        // 수업 중복
        if (await Lecture.checkLecture(lectureName)) {
            res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.REPEAT_LECTURE_NAME));
            return;
        }

        // 수업 추가
        const lectureId = await Lecture.createLecture(
            lectureName,
            color,
            orgLocation,
            bank,
            accountNumber,
            totalHours,
            price
        );
        if (lectureId === -1) {
            return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }

        // 수업 스케줄 셋팅 자동 추가
        for (let schedule of schedules) {
            const {
                day,
                orgStartTime,
                orgEndTime
            } = schedule;
            const scheduleId = await Lecture.setSchedule(day, orgStartTime, orgEndTime, lectureId);
            if (scheduleId === -1) {
                return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
            }
        }

        // 디폴트 스케줄 있을 때 class 디비에 일정 자동 추가
        if (schedules.length !== 0) {
            lecture.createCnDAuto(0, 0, schedules, lectureId, orgLocation, totalHours);
        }

        // 수업 연결
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        const conId = await Lecture.createConnect(userIdx, lectureId);
        if (conId === -1) {
            return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }

        // ** 수업 방 개설 성공 **
        res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.ADD_LECTURE_SUCCESS));
    },

    /* 수업 목록 조회  get : [ /lecture ] */
    getLectureAll: async (req, res) => {
        const userIdx = req.decoded.userId;
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        const result = await Lecture.getLectureAll(userIdx)
        // 수업 목록 조회 성공
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.CHECK_LECTURE_LIST_SUCCESS, result));
    },

    /* 수업 상세 조회  get : [ /lecture/:lid ] */
    getLectureById: async (req, res) => {
        const userIdx = req.decoded.userId;
        const {
            lid
        } = req.params;
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        // 해당 수업 없음
        const result = await Lecture.getLectureById(userIdx, lid)
        if (result.length === 0) {
            return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.NO_LECTURE));
        }
        // 수업 상세 조회 성공
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.CHECK_SPECIFIC_LECTURE_LIST_SUCCESS, result));

    },

    /* 수업 수정  put : [ /lecture/:lid] */
    updateLecture: async (req, res) => {
        const userIdx = req.decoded.userId;
        const {
            lid
        } = req.params;
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
        // 해당 수업 없음
        if (!await Lecture.getLectureById(userIdx, lid)) {
            return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.NO_LECTURE));
        }

        // 수업 수정
        const updateId = await Lecture.updateLecture(
            lid,
            lectureName,
            color,
            orgLocation,
            bank,
            accountNumber,
            totalHours,
            price
        );
        if (updateId === -1) {
            return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        //console.log('수업 수정 성공')

        // 이전 스케줄 삭제
        const isDeleted = await Lecture.deleteSchedules(lid);
        if (isDeleted === -1) {
            return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        //console.log('이전 스케줄 삭제 성공')

        // 수업 스케줄 셋팅 자동 추가
        for (let schedule of schedules) {
            const {
                day,
                orgStartTime,
                orgEndTime
            } = schedule;
            const scheduleId = await Lecture.setSchedule(day, orgStartTime, orgEndTime, lid);
            if (scheduleId === -1) {
                return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
            }
        }
        //console.log('새로운 스케줄로 수정 성공')

        // 오늘 이전 스케쥴 시간 받아오기
        const todayDate = new Date()
        // 9 더하는 부분 검토해야함
        todayDate.setHours(todayDate.getHours() + 9)
        const todayDateString = todayDate.toISOString().slice(0, 10)
        //console.log(todayDateString)
        const result = await Lecture.getSoFar(todayDateString, lid)
        //console.log(result)

        const doneTimes = result[0]['count(hour)'] || 0
        const doneHours = result[0]['sum(hour)'] || 0
        //console.log(doneTimes, doneHours)

        // 오늘 이후 스케쥴 삭제 - doneTime이 0 일때 중복상황 예외처리
        //if (doneTimes !== 0) { 
        const deleteId = await Lecture.deleteSoFar(todayDateString, lid)
        if (deleteId === -1) {
            return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        //}
        //console.log('오늘 이후 스케쥴 삭제 성공')

        // 디폴트 스케줄 있을 때 class 디비에 일정 자동 수정
        if (schedules.length !== 0) {
            lecture.createCnDAuto(doneTimes, doneHours, schedules, lid, orgLocation, totalHours);
        }
        //console.log('오늘 이후 스케쥴 자동 재셋팅 성공')

        // ** 수업 정보 변경 성공 **
        res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.CHANGE_LECTURE_SUCCESS));
    },


    /* 토글 수업목록 조회  get : [ /toggle ] */
    getLectureNames: async (req, res) => {
        const userIdx = req.decoded.userId;
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        const result = await Lecture.getLectureNames(userIdx)
        // 초대 정보 불러오기 성공
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.CHECK_LECTURE_NAME_LIST_SUCCESS, result));
    },

    /* 수업방 나가기  delete : [ /lecture/:lid ] */
    deleteConnection: async (req, res) => {
        const userIdx = req.decoded.userId;
        const {
            lid
        } = req.params;

        // 값이 없으면 - NULL_VALUE
        if (!userIdx || !lid) {
            res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }

        // 해당 연결 아이디가 없다면
        const conId = await Lecture.getconId(userIdx, lid);
        if (conId.length === 0) {
            return res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.NO_LECTURE));
        }

        // 연결 행 삭제
        const idx = await Lecture.deleteConnection(conId[0].conId);
        if (idx === -1) {
            return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        // 연결 해제 성공
        res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.EXIT_LECTURE_SUCCESS));
    },

    /* 수업방 연결  post : [ /lecture/invitation ] */
    createConnection: async (req, res) => {
        const userIdx = req.decoded.userId;
        const {
            code
        } = req.body;

        // 코드 없음
        if (!code) {
            res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.NO_CODE));
            return;
        }
        
        // 이미 연결된 수업
        const isConnected = await Lecture.checkConnect(userIdx, code);
        if (isConnected.length !== 0) {
            res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.ALREADY_CONNECT));
            return;
        }

        // 해당 수업이 없을 때
        const result = await Lecture.checkCode(code);
        if (result.length === 0) {
            res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.NO_LECTURE_CODE));
            return;
        }
        const lectureId = result[0].lectureId;
        
        // 수업 연결
        if (!userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        const conId = await Lecture.createConnect(userIdx, lectureId); // code 추가
        if (conId === -1) {
            return res.status(CODE.DB_ERROR).send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }

        // ** 수업 방 연결 성공 **
        res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.INVITATION_CONNECT_SUCCESS));
    },

    /* 수업 초대  get : [ /lecture/invitation/:lid ] */
    getCode: async (req, res) => {
        const {
            lid
        } = req.params;
        const code = await Lecture.getCodeById(lid);
        // 수업 아이디 확인
        if (code.length === 0) {
            res.status(CODE.BAD_REQUEST).send(util.fail(CODE.BAD_REQUEST, MSG.NO_LECTURE));
            return;
        }

        // 초대 정보 불러오기 성공
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.INVITATION_SUCCESS, code[0]));
    },
};

module.exports = lecture;
