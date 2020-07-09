// const pool = require('../modules/pool');
// const table = 'post';

// const post = {
//     create: async (authorId, title, content, userIdx) => {
//         const fields = 'authorId, title, content, user_userIdx';
//         const questions = `?, ?, ?, ?`;
//         const values = [authorId, title, content, userIdx];
//         const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
//         try {
//             const result = await pool.queryParamArr(query, values);
//             // console.log(result) 객체 반환, 데이터 삽입 실패시 -1 뜨는듯
//             const insertId = result.insertId;
//             return insertId;
//         } catch (err) {
//             if (err.errno == 1062) {
//                 console.log('create ERROR : ', err.errno, err.code);
//                 return -1;
//             }
//             console.log('create ERROR : ', err);
//             throw err;
//         }
//     },
//     getAll: async () => {
//         const query = `SELECT * FROM ${table}`;
//         try {
//             const result = await pool.queryParam(query);
//             console.log(result)
//             return result

//         } catch (err) {
//             if (err.errno == 1062) {
//                 console.log('getAll ERROR : ', err.errno, err.code);
//                 return -1;
//             }
//             console.log('getAll ERROR : ', err);
//             throw err;
//         }
//     },
//     update: async (id, title, content) => {
//         const query = `UPDATE ${table} SET title = "${title}", content = "${content}" WHERE postIdx="${id}"`;

//         try {
//             const result = await pool.queryParam(query);
//             console.log(result) // 객체 반환, 데이터 수정 실패시 -1 뜨는듯
//             const insertId = result.insertId;
//             return insertId;

//         } catch (err) {
//             console.log('update ERROR : ', err);
//             throw err;
//         }
//     },
//     delete: async (id) => {
//         const query = `DELETE FROM ${table} WHERE postIdx="${id}"`;
//         try {
//             const result = await pool.queryParam(query);
//             console.log(result) // 객체 반환, 데이터 삭제 실패시 -1 뜨는듯
//             const insertId = result.insertId;
//             return insertId;

//         } catch (err) {
//             console.log('delete ERROR : ', err);
//             throw err;
//         }
//     },
//     getPostById: async (id) => {
//         const query = `SELECT * FROM ${table} WHERE postIdx="${id}"`;

//         try {
//             const post = await pool.queryParam(query);
//             // console.log(user) 배열로 나옴
//             return post;

//         } catch (err) {
//             console.log('getPost ERROR : ', err);
//             throw err;
//         }
//     }
// }

// module.exports = post;