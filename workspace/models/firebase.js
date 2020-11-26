const table = 'firebase'

const firebase = {
    getCode: async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            console.log(result)
            return result

        } catch (err) {
            console.log('getCode ERROR : ', err);
            throw err;
        }
    },
    insertCode: async (firebaseCode) => {
        const fields = 'firebaseCode';
        const questions = `?`;
        const values = [firebaseCode];
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
    },
}

module.exports = firebase;