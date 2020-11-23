const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const DB = require('../config/database');
const UserModel = require('../models/user');

module.exports = {

   array: async (req, res) => {
       const images = req.files;

       //이미지 사진이 아예 없음
       if(images === undefined){
           return res.status(CODE.BAD_REQUEST)
               .send(util.fail(CODE.BAD_REQUEST, "이미지를 첨부하세요"));
       }
       const location = images.map(img => img.location);
       res.status(CODE.OK).send(util.success(CODE.OK, images.length + "개의 이미지 저장 성공"));
   }
}