const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const UserModel = require('../models/user');

module.exports = {
    array: async (req, res) => {
        try {
            const userIdx = req.decoded.userIdx;
            const images = req.files

            // 이미지 체크
            if (images === undefined) {
                return res.status(statusCode.OK).send(util.success(statusCode.BAD_REQUEST, "이미지를 첨부해주세요"));
            }

            // user check - undefined
            if (!userIdx) {
                return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            }

            // call model - database
            const locations = images.map(img => img.location)
            for (location of locations) {
                await UserModel.updateSefiles(location, userIdx);
            }
            res.status(statusCode.OK).send(util.success(statusCode.OK, images.length + "개의 이미지 저장 성공", {
                image: locations,
                userIdx: userIdx
            }));
        } catch (err) {
            throw err;
        }
    }
}