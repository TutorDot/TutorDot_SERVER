const pool = require('../modules/pool');
const table = 'user';

const user = {
    signup: async (userName, email, password, salt, role) => {
        const fields = 'userName, email, password, salt, role';
        const questions = `?, ?, ?, ?, ?`;
        const values = [userName, email, password, salt, role];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            //console.log(result)
            const insertId = result.insertId;
            //console.log(insertId);
            return insertId;
        } catch (err) {
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    checkUser: async (email) => {
        const query = `SELECT * FROM ${table} WHERE email="${email}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    getUserById: async (email) => {
        const query = `SELECT * FROM ${table} WHERE email="${email}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getUserById ERROR : ', err);
            throw err;
        }
    },
    getUserByIdx: async (idx) => {
        const query = `SELECT * FROM ${table} WHERE userId="${idx}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getUserByIdx ERROR : ', err);
            throw err;
        }
    },
    readProfile: async (userIdx) => {
        const query = `SELECT userName, role, intro, profileUrl FROM ${table} WHERE userId="${userIdx}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('read profile ERROR : ', err);
            throw err;
        }
    },

    updateProfile: async (userIdx, profileImg, intro) => {
        let query = `UPDATE ${table} SET profileUrl="${profileImg}", intro="${intro}" WHERE userId="${userIdx}"`;
        try {
            await pool.queryParam(query);
            //catch문이 실행 안되었다면 query문과 result을 리턴하여라
            query = `SELECT userName, email, role, intro, profileUrl FROM ${table} WHERE userId="${userIdx}"`;
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('update profile ERROR : ', err);
            throw err;
        }
    },
    deleteUser: async (idx) => {
        const query = `DELETE FROM ${table} WHERE userId="${idx}"`;
        try {
            const result = await pool.queryParam(query);
            console.log(result) // 객체 반환, 데이터 삭제 실패시 -1 뜨는듯
            const insertId = result.insertId;
            return insertId;

        } catch (err) {
            console.log('deleteUser ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;