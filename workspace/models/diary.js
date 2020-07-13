const pool = require('../modules/pool');
const table = 'diary';
const userTable = 'user';
const connectTable = 'connect';
const classTable = 'class';

const diary = {
    getAll: async (userIdx) => {
        const value = 'diaryId, classDate, color, times, hour, depositCycle, classProgress, homework, hwPerformance';
        const query = `SELECT ${value} FROM connect 
        INNER JOIN lecture ON lecture.lectureId = connect.lecture_lectureId
        INNER JOIN diary ON diary.lecture_lectureId = connect.lecture_lectureId
        INNER JOIN class ON class.classId = diary.class_classId
        where connect.user_userId = ${userIdx}`;
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
    updateDiary: async (did, classProgress, homework, hwPerformance) => {
        const query = `UPDATE ${table} SET classProgress = "${classProgress}", homework = "${homework}", hwPerformance="${hwPerformance}" WHERE diaryId ="${did}"`;

        try {
            const result = await pool.queryParam(query);
            console.log(result) // 객체 반환, 데이터 수정 실패시 -1 뜨는듯
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            console.log('updateDiary ERROR : ', err);
            throw err;
        }
    },
    getDiaryBylIdUserIdx: async (userIdx, lid) => {
        const value = 'diaryId, classDate, color, times, hour, depositCycle, classProgress, homework, hwPerformance';
        const query = `SELECT ${value} FROM connect 
        INNER JOIN lecture ON lecture.lectureId = connect.lecture_lectureId
        INNER JOIN diary ON diary.lecture_lectureId = connect.lecture_lectureId
        INNER JOIN class ON class.classId = diary.class_classId
        where connect.user_userId = ${userIdx} AND connect.lecture_lectureId = ${lid}`;

        try {
            const post = await pool.queryParam(query);
            // console.log(user) 배열로 나옴
            return post;

        } catch (err) {
            console.log('getDiaryBylIdUserIdx ERROR : ', err);
            throw err;
        }
    },
    getDiaryById: async (did) => {
        const query = `SELECT * from diary WHERE diaryId="${did}"`;

        try {
            const post = await pool.queryParam(query);
            // console.log(user) 배열로 나옴
            return post;

        } catch (err) {
            console.log('getDiaryById ERROR : ', err);
            throw err;
        }
    },
    getDiaryBar: async (userIdx, lid) => {
        const query = `SELECT times ,SUM(hour) OVER(ORDER BY times) AS hour , depositCycle, classDate FROM connect 
        INNER JOIN lecture ON lecture.lectureId = connect.lecture_lectureId
        INNER JOIN diary ON diary.lecture_lectureId = connect.lecture_lectureId
        INNER JOIN class ON class.classId = diary.class_classId
        where connect.user_userId = ${userIdx} AND connect.lecture_lectureId = ${lid}`;

        try {
            const post = await pool.queryParam(query);
            // console.log(user) 배열로 나옴
            return post;
        } catch (err) {
            console.log('getDairyBar ERROR : ', err);
            throw err;
        }
    }
}

module.exports = diary;