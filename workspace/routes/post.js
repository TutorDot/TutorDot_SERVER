// const express = require('express');
// const router = express.Router();
// const postController = require('../controllers/post');
// const AuthUtil = require('../middlewares/auth')


// /* 모든 게시글 조회  get : [ /post ] */
// router.get('/', AuthUtil.checkToken, postController.getAll);

// /* 게시글 고유 id 값을 조회 get :  [ /post/:id ] */
// router.get('/:id', postController.getPostById)

// /* 게시글 생성 post : [ /post ] */
// router.post('/', postController.createPost)

// /* 게시글 수정 put : [ /post/:id ] */
// router.put('/:id', postController.updatePost)

// /* 게시글 삭제 delete : [ /post/:id ] */
// router.delete('/:id', postController.deletePost)

// module.exports = router;