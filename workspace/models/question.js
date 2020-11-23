const pool = require('../modules/pool');
const lectureTable = 'lecture';
const questionTable = 'question';
const connectTable = 'connect';

const question = {
    questionSignup: async (content, questionUrl, questionTime, lectureId) => {
        const fields = 'content, questionUrl, questionTime, lecture_lectureId';
        const questions = `?, ?, ?, ?`;
        const values = [content, questionUrl, questionTime, lectureId];
        const query = `INSERT INTO ${questionTable}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            //console.log(result)
            const insertId = result.insertId;
            //console.log(insertId);
            return insertId;
        } catch (err) {
            console.log('questionSignup ERROR : ', err);
            throw err;
        }
    },
    getAll: async (userIdx) => {
        const data = 'questionId, lecture.lectureName, lecture.color, content, questionTime, questionUrl';
        const query = `SELECT ${data}
        FROM ${questionTable}
        JOIN ${lectureTable} ON ${questionTable}.lecture_lectureId = ${lectureTable}.lectureId
        JOIN ${connectTable} ON ${lectureTable}.lectureId = ${connectTable}.lecture_lectureId 
        WHERE ${connectTable}.user_userId=${userIdx};`;

        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getAll ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getAll ERROR : ', err);
            throw err;
        }
    },

    getLecture: async (userIdx, lectureIdx) => {
        const data = 'questionId, lecture.lectureName, lecture.color, content, questionTime, questionUrl';
        const query = `SELECT ${data}
        FROM ${questionTable}
        JOIN ${lectureTable} ON ${questionTable}.lecture_lectureId = ${lectureTable}.lectureId
        JOIN ${connectTable} ON ${lectureTable}.lectureId = ${connectTable}.lecture_lectureId 
        WHERE ${connectTable}.user_userId=${userIdx} AND ${connectTable}.lecture_lectureId = ${lectureIdx};`;

        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getLecture ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getLecture ERROR : ', err);
            throw err;
        }
    },

    checkLid: async (lectureIdx) => {
        const query = `SELECT * FROM ${lectureTable} WHERE lectureId="${lectureIdx}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            console.log('checkLid ERROR : ', err);
            throw err;
        }
    },

    checkQid: async (questionIdx) => {
        const query = `SELECT * FROM ${questionTable} WHERE questionId="${questionIdx}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            console.log('checkQid ERROR : ', err);
            throw err;
        }
    },

    getQuestion: async(questionIdx)=>{
        const data = 'questionId, lecture.lectureName, lecture.color, content, questionTime, questionUrl';
        const query =`SELECT ${data}
        FROM ${questionTable}
        INNER JOIN ${lectureTable}
        ON lecture_lectureId = lectureId
        WHERE questionId=${questionIdx};`;
        
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getQuestion ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getQuestion ERROR : ', err);
            throw err;
        }
    }
}

module.exports = question;