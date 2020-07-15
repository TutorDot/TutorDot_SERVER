const pool = require('../modules/pool');
const classTable = 'class';
const lectureTable = 'lecture';
const noticeTable = 'notice';

const notice = {
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
                console.log('getPayment ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getPayment ERROR : ', err);
            throw err;
        }
    },

    // isTomorrow: async(todayDate)=>{
    //     console.log(todayDate);
    //     let str_today = todayDate.substr(8, 9);
    //     let str_tomorrow = String(parseInt(str_today)+1);
    //     tomorrowDate = todayDate.replace(str_today, str_tomorrow);
    //     console.log(tomorrowDate);
    //     const query = `SELECT * FROM ${classTable} WHERE classDate="${tomorrowDate}"`;

    //     try {
    //         const result = await pool.queryParam(query);
    //         if (result.length === 0) {
    //             return false;
    //         } else return true;
    //     } catch (err) {
    //         console.log('isTomorrow ERROR : ', err);
    //         throw err;
    //     }
    // },

    // getClassIdx: async(tomorrowDate) => {
    //     const query = `SELECT lecture_lectureId 
    //     FROM ${classTable} 
    //     WHERE classDate=${tomorrowDate}`;

    //     try {
    //         const result = await pool.queryParam(query);
    //         return result;
    //     } catch (err) {
    //         if (err.errno == 1062) {
    //             console.log('getClassIdx ERROR : ', err.errno, err.code);
    //             return -1;
    //         }
    //         console.log('getClassIdx ERROR : ', err);
    //         throw err;
    //     }
    // },

    // insertNotice: async() => {
    //     const fields = 'noticeType, noticeDate, lecture_lectureId';
    //     const questions = `?, ?, ?`;
    //     let lectureId = await notice.getClassIdx(tomorrowDate);
    //     const values = [1, noticeDate, lectureId];
    //     const query = `INSERT INTO ${noticeTable}(${fields}) VALUES (${questions})`;

    //     try {
    //             const result = await pool.queryParamArr(query, values);
    //             // console.log(result) 객체 반환, 데이터 삽입 실패시 -1 뜨는듯
    //             const insertId = result.insertId;
    //             return insertId;
    //         } catch (err) {
    //             if (err.errno == 1062) {
    //                 console.log('insertNotice ERROR : ', err.errno, err.code);
    //                 return -1;
    //             }
    //             console.log('insertNotice ERROR : ', err);
    //             throw err;
    //         }
    // },

    // getClassTomorrow: async() => {
    //     //sql문 손보기
    //     const data = "lecture_lectureId, color, lectureName, noticeType, noticeDate"
    //     const query = `SELECT ${data} FROM ${noticeTable}
    //     INNER JOIN ${lectureTable} ON ${noticeTable}.lecture_lectureId = ${lectureTable}.lectureId
    //     INNER JOIN connect ON notice.lecture_lectureId = connect.lecture_lectureId
    //     WHERE connect.user_userId = ${userIdx} AND classDate="${tomorrowDate}"`

    //     try {
    //         const result = await pool.queryParam(query);
    //         return result;
    //     } catch (err) {
    //         if (err.errno == 1062) {
    //             console.log('getClassTomorrow ERROR : ', err.errno, err.code);
    //             return -1;
    //         }
    //         console.log('getClassTomorrow ERROR : ', err);
    //         throw err;
    //     }
    // }
}

module.exports = notice;