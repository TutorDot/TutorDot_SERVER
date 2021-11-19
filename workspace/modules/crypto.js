const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

module.exports = {
     /* signup 시 password를 보내고 salt와 hashed를 반환 */
    encrypt: async (password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = (await crypto.randomBytes(32)).toString('hex');
                pbkdf2.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
                    if(err) throw err;
                    const hashed = derivedKey.toString('hex');
                    resolve({salt,hashed});
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    },
    
     /* signin시 저장된 salt와 password를 통해 저장된 값과 같은지 확인용도 */
    encryptWithSalt: async (password, salt) => {
        return new Promise(async (resolve, reject) => {
            try {
                pbkdf2.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
                    if(err) throw err;
                    const hashed = derivedKey.toString('hex');
                    resolve(hashed);
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    }
}
