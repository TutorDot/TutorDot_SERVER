var express = require("express");
var router = express.Router();

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

// 알림
router.use("/notice", require("./notice"));

<<<<<<< HEAD
var admin = require("firebase-admin");

var serviceAccount = require("/Users/yooyounglee/Documents/tutordot-ff6d6-firebase-adminsdk-paa4m-95db774518.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tutordot-ff6d6.firebaseio.com"
});

var registrationToken = "cUbK4zaSSxm710dyYu3OQn:APA91bG1j90tt1RmrK7RtjBGd9SPRuL1vxhDiQZSTxFTx8DkD4KNz1XMY59JHJLY_ESw1jRlXzkgTLm7WvZvWKxDFztv_RbZ58x3ryeN5jyIpr3d2h9COTrriTlEngxY98pptMt6yDqB"; 

var payload = {
  notification: {
    title: "일지 업데이트",
    body: "수업 일지가 업데이트 되었습니다!"
  }
};

admin.messaging().sendToDevice(registrationToken, payload).then(function(response){
  console.log("Successfully sent: ", response);
})
.catch(function(error){
  console.log("Error sending message: ", error);
});
=======
//소셜로그인
router.use("/login",require("./login.js"));
>>>>>>> 86e510e84b27f4069f1be57db1fb5e526b5fc40f

module.exports = router;
