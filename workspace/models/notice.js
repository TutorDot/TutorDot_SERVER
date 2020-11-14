const pool = require('../modules/pool');
const noticeTable = 'notice';



const notice = {
    getNoticeId: async (userIdx) => {
        const value = 'noticeDate, lectureId, lectureName, color, noticeType';
        const query = `SELECT ${value} FROM ${noticeTable}
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

    getAll: async (userIdx) => {
        const value = 'noticeDate, lectureId, lectureName, color, noticeType';
        const query = `SELECT ${value} FROM ${noticeTable}
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
        const query = `SELECT ${value} FROM ${noticeTable}
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
    }
}

module.exports = notice;