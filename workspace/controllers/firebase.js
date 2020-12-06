const firebaseKey = require('../config/firebase.json');
const firebaseModel = require('../models/firebase');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');


module.exports = {

    insertCode: async (req, res) => {
        const {
            firebaseCode,
            lectureId
        } = req.body;
        if (!firebaseCode || !lectureId) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }

        const idx = await firebaseModel.insertCode(firebaseCode, lectureId);

        if (idx === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        res.status(CODE.OK)
            .send(util.success(CODE.NO_CONTENT, MSG.FIREBASECODE_SECCESS));
    },


    updateDiary: async (req, res) => {
        const lectureId = req.body;
        if (!lectureId) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }
        const userIdx = req.decoded.userId;

        var admin = require("firebase-admin");
        var serviceAccount = firebaseKey;

        admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://tutordot-ff6d6.firebaseio.com"
        });
        
        const code = await firebaseModel.getFirebaseCode(lectureId);
        console.log(code);
        var registrationToken = "cUbK4zaSSxm710dyYu3OQn:APA91bG1j90tt1RmrK7RtjBGd9SPRuL1vxhDiQZSTxFTx8DkD4KNz1XMY59JHJLY_ESw1jRlXzkgTLm7WvZvWKxDFztv_RbZ58x3ryeN5jyIpr3d2h9COTrriTlEngxY98pptMt6yDqB";

        const LectureName = await firebaseModel.getLectureName(userIdx, lectureId);
        const Role = await firebaseModel.getRole(userIdx, lectureId);
        const UserName = await firebaseModel.getUserName(userIdx, lectureId);

        var payload = {
        notification: {
            title: "수업 일지가 추가되었습니다.",
            body: `${Role} + 업데이트 되었습니다.`,
            isScheduled : "true",
            scheduledTime : "12:00:00"
        }
        };

        admin.messaging().sendToDevice(registrationToken, payload).then(function(response){
        console.log("Successfully sent: ", response);
        })
        .catch(function(error){
        console.log("Error sending message: ", error);
        });

        res.status(CODE.OK)
        .send(util.success(CODE.NO_CONTENT, MSG.UPDATE_DIARY));
        }
}