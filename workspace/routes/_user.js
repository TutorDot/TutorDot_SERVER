// const express = require('express');
// const router = express.Router();
// const UserController = require('../controllers/user');
// const AuthMiddleware = require('../middlewares/auth');
// const upload = require('../modules/multer')
// const imageController = require('../controllers/image.js')

// router.post('/signup', UserController.signup);
// router.post('/signin', UserController.signin);

// /* 
//     ✔️ update profile
//     METHOD : POST
//     URI : localhost:3000/user/profile
//     REQUEST HEADER : JWT
//     REQUEST BODY : ⭐️image file ⭐️
//     RESPONSE DATA : user profile
// */

// router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);
// router.post('/selfies', AuthMiddleware.checkToken, upload.array('images', 4), imageController.array);
// module.exports = router;