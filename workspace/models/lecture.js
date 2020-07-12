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
                console.log('createClassesAuto ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createClassesAuto ERROR : ', err);
            throw err;
        }
    },

    /* 수업 연결 */
    createConnect: async (userIdx, lectureId) => {
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
                console.log('createClassesAuto ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createClassesAuto ERROR : ', err);
            throw err;
        }
    },

    /* 수업 목록 조회  get : [ /lecture ] */
    getLectureAll: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업 상세 조회  get : [ /lecture/:lid ] */
    getLectureById: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업 정보 수정  put : [ /lecture/:lid] */
    updateLecture: async () => {

        try {

        } catch (err) {

        }
    },

    /* 토글 수업목록 조회  get : [ /toggle ] */
    getLectureNames: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업방 나가기  delete : [ /lecture/:lid ] */
    deleteConnection: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업방 연결  post : [ /lecture/invitation ] */
    createConnection: async () => {

        try {

        } catch (err) {

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
            console.log('checkLid ERROR : ', err);
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