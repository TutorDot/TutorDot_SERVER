const NoticeModel = require('../models/notice');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const noticeKey = require('../config/notice.js');
const FCM = require('fcm-push');

var serverKey = 'AAAA8-MmcB4:APA91bHWy47kvz2HWpP8mjpP3sIysaBL2iCwPU5TcQPke1ejW53nkvpFbvE3zyVDvDEnyxZVzWHkSoTYhy9ZZPyd536rdar4mJF_GuJ7polrYEhL4xxNCG7URXU0L8q0PHTz40Lu5F4r';
var fcm = new FCM(serverKey);

const Notice = {
    //전체 수업알림 조회
    getAll: async (req, res, next) => {
        const userIdx = req.decoded.userId;
        const Notices = await NoticeModel.getAll(userIdx);
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_TOTAL_ALARM_SUCCESS, Notices));
    },
    //수업 일지 추가 푸시알림
    pushmsg: async (req, fcm, next) => {
        const userIdx = req.decoded.userId;
        const NoticesUserName = await NoticeModel.getUserName(userIdx);
        var message = {
            to: noticeKey.notice.clientkey, // required fill with device token or topics
            collapse_key: 'testpush', 
            data: {
                your_custom_data_key: NoticesUserName
            },
            notification: {
                title: '수업일지가 추가되었습니다',
                body: '일지가 업데이트 되었습니다'
            }
        };
        res.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    },
    //특정 수업알림 조회
    getNoticeId: async (req, res, next) => {
        const userIdx = req.decoded.userId;
        //파라미터 받아오는 방법
        const {
            lid
        } = req.params;

        const Notices = await NoticeModel.getNoticeId(userIdx, lid);
        //const typeArray = ["내일 수업이 있습니다.", "수업료를 입금해주세요.", "수업 일지가 업데이트 되었습니다.", "수업 일정이 업데이트 되었습니다."]

        //lid가 잘못된 값이 들어왔을 경우
        if (Notices.length === 0) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_LECTURE));
        }

        //특정 수업 알림 조회 성공
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_SPECIFIC_ALARM_SUCCESS, Notices));
    }
}

module.exports = Notice;