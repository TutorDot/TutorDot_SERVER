const pool = require('../modules/pool');
const table = 'firebase'

const firebase = {
    // 알림 메세지 부분에 들어가는 정보 얻기
    getUserName: async (userIdx, lectureId) => {
        const value = 'userName';
        const query = `SELECT ${value} FROM connect
        INNER JOIN firebase ON firebase.lecture_lectureId = connect.lecture_lectureId
        INNER JOIN user ON connect.user_userId = user.userId
        Where connect.user_userId = ${userIdx} AND connect.lecture_lectureId = ${lectureId}`;
        try {
            const result = await pool.queryParam(query);
            console.log(result)
            return result

        } catch (err) {
            console.log('getUserName ERROR : ', err);
            throw err;
        }
    },
    getRole: async (userIdx, lectureId) => {
        const value = 'role';
        const query = `SELECT ${value}  FROM connect
        INNER JOIN firebase ON firebase.lecture_lectureId = connect.lecture_lectureId
        INNER JOIN user ON connect.user_userId = user.userId
        Where connect.user_userId = ${userIdx} AND connect.lecture_lectureId = ${lectureId}`;
        try {
            const result = await pool.queryParam(query);
            console.log(result)
            return result

        } catch (err) {
            console.log('getRole ERROR : ', err);
            throw err;
        }
    },
    getLectureName: async (userIdx, lectureId) => {
        const query = `SELECT lectureName
        FROM connect
        INNER JOIN firebase ON firebase.lecture_lectureId = connect.lecture_lectureId
        INNER JOIN user ON connect.user_userId = user.userId
        Where connect.user_userId = ${userIdx} AND connect.lecture_lectureId = ${lectureId}`;
        try {
            const result = await pool.queryParam(query);
            //console.log(result)
            return result;

        } catch (err) {
            console.log('getLectureName ERROR : ', err);
            throw err;
        }
    },
    getFirebaseCode: async (lectureId) => {
        const query = `SELECT firebaseCode FROM ${table} WHERE lecture_lectureId="${lectureId}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getFirebaseCode ERROR : ', err);
            throw err;
        }
    },
    insertCode: async (firebaseCode, lectureId) => {
        const fields = 'firebaseCode, lecture_lectureId';
        const questions = `?, ?`;
        const values = [firebaseCode, lectureId];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            //console.log(result)
            const insertId = result.insertId;
            //console.log(insertId);
            return insertId;
        } catch (err) {
            console.log('insertCode ERROR : ', err);
            throw err;
        }
    }
}

module.exports = firebase;