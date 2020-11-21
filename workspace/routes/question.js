const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question');
const AuthMiddleware = require('../middlewares/auth');