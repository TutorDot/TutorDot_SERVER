const noticeKey = require('../config/notice.js');
var FCM = require('fcm-push');

var serverKey = 'AAAA8-MmcB4:APA91bHWy47kvz2HWpP8mjpP3sIysaBL2iCwPU5TcQPke1ejW53nkvpFbvE3zyVDvDEnyxZVzWHkSoTYhy9ZZPyd536rdar4mJF_GuJ7polrYEhL4xxNCG7URXU0L8q0PHTz40Lu5F4r';
var fcm = new FCM(serverKey);

var message = {
    to: noticeKey.notice.clientkey, // required fill with device token or topics
    collapse_key: 'your_collapse_key', 
    data: {
        your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
};

//callback style
fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});

//promise style
fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })