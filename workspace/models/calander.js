const pool = require('../modules/pool');
const classTable = 'class';
const lectureTable = 'lecture';
const connectTable = 'connect';


const calander = {
    getAll: async (userIdx) => {
        const data = 'classId, lecture.lectureName, color, times, hour, location, classDate, startTime, endTime';
        const query = `SELECT ${data}
        FROM ${classTable}
        JOIN ${lectureTable} ON ${classTable}.lecture_lectureId = ${lectureTable}.lectureId
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
        const data = 'classId, lecture.lectureName, color, times, hour, location, classDate, startTime, endTime';
        const query = `SELECT ${data}
        FROM ${classTable}
        JOIN ${lectureTable} ON ${classTable}.lecture_lectureId = ${lectureTable}.lectureId
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

    checkCid: async (classIdx) => {
        const query = `SELECT * FROM ${classTable} WHERE classId="${classIdx}"`;
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

    calcHour: async(startTime, endTime) => {
        let int_startTime;
        if(startTime.substr(5) === "pm"){
            int_startTime = parseInt(startTime.substr(0, 2))+12;
        }
        else{
            int_startTime = parseInt(startTime.substr(0, 2));
        }

        let int_endTime;
        if(endTime.substr(5) === "pm"){
            int_endTime = parseInt(endTime.substr(0, 2))+12;
        }
        else{
            int_endTime = parseInt(endTime.substr(0, 2));
        }

        return int_endTime - int_startTime;
    },

    getClassIdx: async() => {
        const query = `SELECT MAX(classId) FROM ${classTable}`;

        try {
            const result = await pool.queryParam(query);
            return result[0]['MAX(classId)'];
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getClassIdx ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getClassIdx ERROR : ', err);
            throw err;
        }
    },

    getLectureId: async(classIdx) => {
        const query = `SELECT lecture_lectureId FROM ${classTable} WHERE classId="${classIdx}";`;
        console.log("classIdx: ", classIdx);

        try {
            const result = await pool.queryParam(query);
            //console.log("getLectureId: ", result);
            return result[0] && result[0].lecture_lectureId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getLectureId ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getLectureId ERROR : ', err);
            throw err;
        }
    },

    /*회차 재정렬*/
    reorderTimes: async(lectureIdx) => {
        const query = `SET @i := 0; UPDATE ${classTable} SET times = (@i:=@i+1) WHERE lecture_lectureId = ${lectureIdx} ORDER BY classDate, startTime;`;

        try {
            const result = await pool.queryParam(query);
            console.log(result); // 객체 반환, 데이터 수정 실패시 -1 뜨는듯
            const insertId = result.insertId;
            return insertId;

        } catch (err) {
            console.log('reorderTimes ERROR : ', err);
            throw err;
        }
    },

    createClass: async(lectureId, date, startTime, endTime, location) => {
        let hour = await calander.calcHour(startTime, endTime);
        let times = 0; //일단 회차에 임의값 넣기
        const fields = 'startTime, endTime, location, hour, times, classDate, lecture_lectureId';
        const questions = `?, ?, ?, ?, ?, ?, ?`;
        const values = [startTime, endTime, location, hour, times, date, lectureId];
        const query = `INSERT INTO ${classTable}(${fields}) VALUES (${questions})`;

        try {
                const result = await pool.queryParamArr(query, values);
                // console.log(result) 객체 반환, 데이터 삽입 실패시 -1 뜨는듯
                const insertId = result.insertId;
                return insertId;
            } catch (err) {
                if (err.errno == 1062) {
                    console.log('createClass ERROR : ', err.errno, err.code);
                    return -1;
                }
                console.log('createClass ERROR : ', err);
                throw err;
            }
    },

    createDiary: async(lectureId) => {
        const fields = 'classProgress, homework, lecture_lectureId, class_classId';
        const questions = `?, ?, ?, ?`;
        let classIdx = await calander.getClassIdx();
        const values = ["진도를 입력해주세요", "숙제를 입력해주세요", lectureId, classIdx];
        const query = `INSERT INTO diary(${fields}) VALUES (${questions})`;

        try {
            const result = await pool.queryParamArr(query, values);
            console.log(result) //객체 반환, 데이터 삽입 실패시 -1 뜨는듯
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createDiary ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createDiary ERROR : ', err);
            throw err;
        }
    },

    getClass: async(classIdx)=>{
        const data = 'lecture_lectureId, color, lectureName, classDate, startTime, endTime, location';
        const query =`SELECT ${data}
        FROM ${classTable}
        INNER JOIN ${lectureTable}
        ON lecture_lectureId = lectureId
        WHERE classId=${classIdx};`;
        
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getClass ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getClass ERROR : ', err);
            throw err;
        }
    },

    putClass: async(classIdx, date, startTime, endTime, location) => {
        const query = `UPDATE ${classTable} 
        SET classDate = "${date}", startTime="${startTime}", endTime="${endTime}", location="${location}" 
        WHERE classId=${classIdx}`;

        try {
            const result = await pool.queryParam(query);
            console.log(result); // 객체 반환, 데이터 수정 실패시 -1 뜨는듯
            const insertId = result.insertId;
            return insertId;

        } catch (err) {
            console.log('putClass ERROR : ', err);
            throw err;
        }
    },

    deleteClass: async(classIdx) => {
        const query = `DELETE FROM ${classTable} WHERE classId=${classIdx}`;

        try {
            const result = await pool.queryParam(query);
            console.log(result); // 객체 반환, 데이터 삭제 실패시 -1 뜨는듯
            const insertId = result.insertId;
            return insertId;

        } catch (err) {
            console.log('deleteClass ERROR : ', err);
            throw err;
        }
    }

}

module.exports = calander;