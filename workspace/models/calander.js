const pool = require('../modules/pool');
const classTable = 'class';
const lectureTable = 'lecture';

const calander = {
    getAll: async () => {
        const data = 'startTime, endTime, hour, times, location, classDate, lecture_lectureId, lectureName, color';
        const query = `SELECT ${data} 
        FROM ${classTable}, ${lectureTable}
        WHERE lectureId = lecture_lectureId`;
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

    getLecture: async (lectureIdx) => {
        const data = 'startTime, endTime, hour, times, location, classDate, lecture_lectureId, lectureName, color';
        const query = `SELECT ${data} 
        FROM ${classTable}, ${lectureTable}
        WHERE lecture_lectureId = ${lectureIdx} AND lectureId = lecture_lectureId;`;
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

    // createClass: async(lectureId, date, startTime, endTime, location) => {
    //     let startTime = parseInt(startTime);
    //     let endTime = parseInt(endTime);
    //     const values = 'startTime, endTime, location, date, lectureId'
    //     const query = `INSERT INTO ${classTable} VALUES (${values})`;
    // }

}

module.exports = calander;