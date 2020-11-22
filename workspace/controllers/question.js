const Question = require('../models/question');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

const question = {
    /*전체 수업 질문 조회 get : [ / ]*/
    getAll: async (req, res) => {
        const userIdx = req.decoded.userId; 

        const questions = await Question.getAll(userIdx);
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_TOTAL_QUESTION_SUCCESS, questions));
    },

    /*특정 수업 질문 조회 get : [ /:lid ]*/
    getLecture: async (req, res) => {
        const userIdx = req.decoded.userId; 
        const lectureIdx = req.params.lid;
        const questions = await Question.getLecture(userIdx, lectureIdx);

        let lidExists = await Question.checkLid(lectureIdx);
        if (!lidExists) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_LECTURE));
        }

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_SPECIFIC_QUESTION_SUCCESS, questions));
    }, 

    /*상세 질문 조회 get : [ /:qid ]*/
    getQuestion: async (req, res) => {
        const questionIdx = req.params.qid;
        const question = await Question.getQuestion(questionIdx);

        if (!questionIdx) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.QID_NULL_VALUE));
        }
        
        let qidExists = await Question.checkQid(questionIdx);
        if (!qidExists) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_QUESTION));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_QUESTION_SUCCESS, question[0]));
    }
}

module.exports = question;