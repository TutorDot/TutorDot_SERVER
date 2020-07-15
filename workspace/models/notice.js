const pool = require('../modules/pool');
const table = 'notice';

const notice = {
    getAll: async (userIdx) => {
        const value = 'noticeDate, lectureId, lectureName, color, noticeType';
        const query = `SELECT ${value} FROM notice
        INNER JOIN lecture ON notice.lecture_lectureId = lecture.lectureId
        INNER JOIN connect ON notice.lecture_lectureId = connect.lecture_lectureId
        WHERE connect.user_userId = ${userIdx}`;

        try {
            const result = await pool.queryParam(query);
            console.log(result)
            return result

        } catch (err) {
            if (err.errno == 1062) {
                console.log('getAll ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getAll ERROR : ', err);
            throw err;
        }
    },
    getNoticeId: async (userIdx, lid) => {
        const value = 'noticeDate, lectureId, lectureName, color, noticeType';
        const query = `SELECT ${value} FROM notice
        INNER JOIN lecture ON notice.lecture_lectureId = lecture.lectureId
        INNER JOIN connect ON notice.lecture_lectureId = connect.lecture_lectureId
        WHERE connect.user_userId = ${userIdx} AND notice.lecture_lectureId = ${lid}`;

        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getNoticeId ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getNoticeId :', err);
            throw err;
        }
    },
    getTimesMax: async (userIdx, lid) => {
        const query = `SELECT MAX(times) FROM connect
        INNER JOIN lecture ON lecture.lectureId = connect.lecture_lectureId
        INNER JOIN diary ON diary.lecture_lectureId = connect.lecture_lectureId
        INNER JOIN class ON class.classId = diary.class_classId
        where connect.user_userId =  ${userIdx} AND connect.lecture_lectureId = ${lid}`;

        try {
            const result = await pool.queryParam(query);
            console.log(result)
            return result

        } catch (err) {
            if (err.errno == 1062) {
                console.log('getTimesMax ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getTimesMax ERROR : ', err);
            throw err;
        }
    },
    getPayment: async (userIdx) => {
        const value = 'noticeDate, lectureId, lectureName, color, noticeType';
        const query = `SELECT ${value} FROM notice
        INNER JOIN lecture ON notice.lecture_lectureId = lecture.lectureId
        INNER JOIN connect ON notice.lecture_lectureId = connect.lecture_lectureId
        WHERE connect.user_userId = ${userIdx}`;

        try {
            const result = await pool.queryParam(query);
            console.log(result)
            return result

        } catch (err) {
            if (err.errno == 1062) {
                console.log('getPayment ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getPayment ERROR : ', err);
            throw err;
        }
    }
}

module.exports = notice;