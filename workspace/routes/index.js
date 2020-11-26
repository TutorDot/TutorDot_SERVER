var express = require("express");
var router = express.Router();
const firebaseKey = require('../config/firebase.json');

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "TutorDot",
  });
});

// 계정
router.use("/user", require("./user"));

// 수업 관리
router.use("/lecture", require("./lecture"));

// 캘린더
router.use("/calander", require("./calander"));

// 수업일지
router.use("/diary", require("./diary"));

//질문란
router.use("/question", require("./question"));

// 알림
router.use("/notice", require("./notice"));

// var admin = require("firebase-admin");

// var serviceAccount = firebaseKey;

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://tutordot-ff6d6.firebaseio.com"
// });

// var registrationToken = "e4A0TUIYSIa6S5pXoAFW0U:APA91bH39_73kpAkfUOZg7659u-f9NoPAAdxItWlIRg8BrB2-GOrMHIeN4M2qwKv0qc2ill3W6XTMaW44U4P2b2DLkn8_sJi_lqesXtd1b_EQ_A627R8JtVpb1sbZiHD3DmWvqGG3_R2"; 

// var payload = {
//   notification: {
//     title: "일지 업데이트",
//     body: "수업 일지가 업데이트 되었습니다!"
//   }
// };

// admin.messaging().sendToDevice(registrationToken, payload).then(function(response){
//   console.log("Successfully sent: ", response);
// })
// .catch(function(error){
//   console.log("Error sending message: ", error);
// });

//소셜로그인
router.use("/login",require("./login.js"));

module.exports = router;
