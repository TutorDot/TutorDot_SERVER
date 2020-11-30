const pool = require('../modules/pool');
const lectureTable = 'lecture';
const scheduleTable = 'schedule';
const classTable = 'class';
const diaryTable = 'diary';
const connectTable = 'connect';


const lecture = {

    /* 수업 중복 확인 */
    checkLecture: async (name) => {
        const query = `SELECT * FROM ${lectureTable} WHERE lectureName="${name}"`;
        try {
            const result = await pool.queryParam(query);
            return result.length === 0 ? false : true
        } catch (err) {
            console.log('checkLecture ERROR : ', err);
            throw err;
        }
    },

    /* 수업 추가  post : [ /lecture ] */
    createLecture: async (lectureName, color, orgLocation, bank, accountNumber, totalHours, price) => {
        const code = Math.random().toString(36).substring(5);
        const fields = 'lectureName, color, orgLocation, bank, accountNo, depositCycle, price, code';
        const questions = `?, ?, ?, ?, ?, ?, ?, ?`;
        const values = [lectureName, color, orgLocation, bank, accountNumber, totalHours, price, code];
        const query = `INSERT INTO ${lectureTable}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const lectureId = result.insertId;
            return lectureId
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createLecture ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createLecture ERROR : ', err);
            throw err;
        }
    },

    /* 수업 스케줄 셋팅 자동 추가 */
    setSchedule: async (day, orgStartTime, orgEndTime, lectureId) => {
        const fields = 'orgStartTime, orgEndTime, day, lecture_lectureId';
        const questions = `?, ?, ?, ?`;
        const values = [orgStartTime, orgEndTime, day, lectureId];
        const query = `INSERT INTO ${scheduleTable}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const scheduleId = result.insertId;
            return scheduleId
        } catch (err) {
            if (err.errno == 1062) {
                console.log('setSchedule ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('setSchedule ERROR : ', err);
            throw err;
        }

    },

    /* class 디비에 일정 자동 추가 */
    createClassAuto: async (startTime, endTime, hour, times, location, classDate, lecture_lectureId) => {
        const fields = 'startTime, endTime, hour, times, location, classDate, lecture_lectureId';
        const questions = `?, ?, ?, ?, ?, ?, ?`;
        const values = [startTime, endTime, hour, times, location, classDate, lecture_lectureId];
        const query = `INSERT INTO ${classTable}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const classId = result.insertId;
            return classId
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createClassesAuto ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createClassesAuto ERROR : ', err);
            throw err;
        }
    },

    /* diary 디비에 일지 자동 추가 */
    createDiaryAuto: async (lectureId, classId) => {
        const fields = 'classProgress, homework, lecture_lectureId, class_classId';
        const questions = `?, ?, ?, ?`;
        const values = ["진도를 입력해주세요", "숙제를 입력해주세요", lectureId, classId];
        const query = `INSERT INTO ${diaryTable}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const diaryId = result.insertId;
            return diaryId
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createDiaryAuto ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createDiaryAuto ERROR : ', err);
            throw err;
        }
    },

    /* 수업 연결 [ /lecture/:lid ] */
    createConnect: async (userIdx, lectureId) => { // code 추가
        const fields = 'user_userId, lecture_lectureId';
        const questions = `?, ?`;
        const values = [userIdx, lectureId];
        const query = `INSERT INTO ${connectTable}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const conId = result.insertId;
            return conId
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createConnect ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createConnect ERROR : ', err);
            throw err;
        }
    },

    /* 수업 목록 조회  get : [ /lecture ] */
    getLectureAll: async (userIdx) => {
        const query = `SELECT lectureId, lectureName, color FROM lecture INNER JOIN connect 
        WHERE connect.lecture_lectureId = lecture.lectureId and connect.user_userId = "${userIdx}";`
        try {
            const result = await pool.queryParam(query);
<<<<<<< HEAD
            let profileUrls;
            let schedules;
            for (let res of result) {
                const lectureId = res.lectureId;
                // profileImg 가져오기
                profileUrls = await lecture.getProfiles(lectureId, userIdx);
                res["profileUrls"] = profileUrls;
                // schedules 가져오기
                schedules = await lecture.getSchedules(lectureId);
                res["schedules"] = schedules;
=======
            //let profileUrls;
            let dataArray;
            for (let res of result) {
                const lectureId = res.lectureId;
                dataArray = [await lecture.getProfiles(lectureId, userIdx), await lecture.getSchedules(lectureId)];
                // profileImg 가져오기
                //profileUrls = await lecture.getProfiles(lectureId, userIdx);
                res['profileUrls'] = dataArray[0];
                // schedules 가져오기
                //schedules = await lecture.getSchedules(lectureId);
                res['schedules'] = dataArray[1];
>>>>>>> bcbb7dc793da8888744a6824568c05b033804ef2
            }
            return result;
        } catch (err) {
            console.log('getLectureAll ERROR : ', err);
            throw err;
        }
    },

    /* 본인 제외 프로필 가져오기 */
    getProfiles: async (lectureId, userIdx) => {
        const query = `SELECT profileUrl
        FROM user as u INNER JOIN connect as c on c.user_userId = u.userId 
        WHERE lecture_lectureId = "${lectureId}" and u.userId !="${userIdx}";`
        try {
            const result = await pool.queryParam(query);
            if (!result) result = []
            return result
        } catch (err) {
            console.log('getProfiles ERROR : ', err);
            throw err;
        }
    },

    /* 수업 상세 조회  get : [ /lecture/:lid ] */
    getLectureById: async (userIdx, lectureId) => {
        const query = `SELECT lectureName, color, orgLocation, bank, accountNo, depositCycle, price, userName, role, intro, profileUrl 
        FROM lecture as l INNER JOIN connect as c on c.lecture_lectureId = l.lectureId 
        INNER JOIN user as u on c.user_userId = u.userId WHERE c.user_userId = ${userIdx} and l.lectureId = ${lectureId}`
        try {
            const result = await pool.queryParam(query);
            result[0]['schedules'] = await lecture.getSchedules(lectureId);
            console.log(result[0])
            return result[0]
        } catch (err) {
            console.log('getLectureById ERROR : ', err);
            throw err;
        }
    },

    /* 디폴트 스케쥴 가져오기 */
    getSchedules: async (lectureId) => {
        const query = `SELECT day, orgStartTime, orgEndTime FROM schedule WHERE lecture_lectureId = ${lectureId}`
        try {
            const result = await pool.queryParam(query);
            if (!result) result = []
            return result
        } catch (err) {
            console.log('getSchedules ERROR : ', err);
            throw err;
        }
    },

    /* 수업 정보 수정  put : [ /lecture/:lid] */
    updateLecture: async (lid, lectureName, color, orgLocation, bank, accountNumber, totalHours, price) => {
        const query = `UPDATE ${lectureTable} SET lectureName = "${lectureName}", color = "${color}", orgLocation="${orgLocation}", bank="${bank}", accountNo="${accountNumber}", depositCycle="${totalHours}", price="${price}" WHERE lectureId ="${lid}"`;
        try {
            const result = await pool.queryParam(query);
            const lectureId = result.insertId;
            return lectureId
        } catch (err) {
            if (err.errno == 1062) {
                console.log('updateLecture ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('updateLecture ERROR : ', err);
            throw err;
        }
    },

    /* 이전 스케쥴 삭제 */
    deleteSchedules: async (lectureId) => {
        const query = `DELETE FROM ${scheduleTable} WHERE lecture_lectureId="${lectureId}"`;
        try {
            const result = await pool.queryParam(query);
            const insertId = result.insertId;
            return insertId;

        } catch (err) {
            console.log('delete ERROR : ', err);
            throw err;
        }
    },

    /* 오늘 이전 스케쥴 시간, 회차 받아오기 */
    getSoFar: async (todayDate, lectureId) => {
        const query = `SELECT count(hour), sum(hour) FROM ${classTable} where classDate < "${todayDate}" and lecture_lectureId = "${lectureId}";`
        try {
            const result = await pool.queryParam(query);
            return result
        } catch (err) {
            console.log('getSchedules ERROR : ', err);
            throw err;
        }
    },
    deleteSoFar: async (todayDate, lectureId) => {
        const query = `DELETE FROM ${classTable} where classDate >= "${todayDate}" and lecture_lectureId = "${lectureId}"`;
        try {
            const result = await pool.queryParam(query);
            const insertId = result.insertId;
            return insertId;

        } catch (err) {
            console.log('delete ERROR : ', err);
            throw err;
        }
    },

    /* 토글 수업목록 조회  get : [ /toggle ] */
    getLectureNames: async (userIdx) => {
        console.log(userIdx)
        const query = `SELECT lectureId, lectureName, color FROM lecture INNER JOIN connect 
        WHERE connect.lecture_lectureId = lecture.lectureId and connect.user_userId = "${userIdx}";`
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('getLectureNames ERROR : ', err);
            throw err;
        }
    },

    /* 수업방 나가기  delete : [ /lecture/:lid ] */
    deleteConnection: async (conId) => {
        const query = `DELETE FROM ${connectTable} WHERE conId="${conId}"`;
        try {
            const result = await pool.queryParam(query);
            const insertId = result.insertId;
            return insertId;

        } catch (err) {
            console.log('delete ERROR : ', err);
            throw err;
        }
    },

    /* 연결 아이디 확인 */
    getconId: async (userIdx, lid) => {
        const query = `SELECT conId FROM ${connectTable} WHERE user_userId = "${userIdx}" AND lecture_lectureId = "${lid}"`;
        try {
            const conId = await pool.queryParam(query);
            return conId
        } catch (err) {
            console.log('checkLid ERROR : ', err);
            throw err;
        }
    },


    /* 수업 아이디 확인 */
    checkLid: async (lid) => {
        const query = `SELECT * FROM ${lectureTable} WHERE lectureId="${lid}"`;
        try {
            const result = await pool.queryParam(query);
            return result.length === 0 ? false : true
        } catch (err) {
            console.log('checkLid ERROR : ', err);
            throw err;
        }
    },

    /* 코드 확인 */
    checkCode: async (code) => {
        const query = `SELECT lectureId FROM ${lectureTable} WHERE code="${code}"`;
        try {
            const result = await pool.queryParam(query);
            return result
        } catch (err) {
            console.log('checkCode ERROR : ', err);
            throw err;
        }
    },
    
    /* 연결 확인 */
    checkConnect: async (userIdx, code) =>{
        const query = `SELECT user_userId, code FROM ${connectTable} INNER JOIN ${lectureTable} WHERE lecture_lectureId = lecture.lectureId AND user_userId = "${userIdx}" AND code="${code}"`;
        try {
            const result = await pool.queryParam(query);
            return result
        } catch (err) {
            console.log('checkConnect ERROR : ', err);
            throw err;
        }
    },

    /* 수업 초대  get : [ /lecture/invitation/:lid ] */
    getCodeById: async (lid) => {
        const query = `SELECT code FROM ${lectureTable} WHERE lectureId="${lid}"`;
        try {
            const code = await pool.queryParam(query);
            return code;
        } catch (err) {
            console.log('getCodeById ERROR : ', err);
            throw err;
        }
    }
}

module.exports = lecture;
