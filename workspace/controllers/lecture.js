const lectureModel = require('../models/lecture');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');

const lecture = {

    /* 수업 추가  post : [ /lecture ] */
    createLecture: async (req, res) => {

    },

    /* 수업 목록 조회  get : [ /lecture ] */
    getLectureAll: async (req, res) => {

    },

    /* 수업 상세 조회  get : [ /lecture/:lid ] */
    getLectureById: async (req, res) => {

    },

    /* 모든 게시글 조회  put : [ /lecture/:lid] */
    updateLecture: async (req, res) => {

    },

    /* 토글 수업목록 조회  get : [ /toggle ] */
    getLectureNames: async (req, res) => {

    },

    /* 수업방 나가기  delete : [ /lecture/:lid ] */
    deleteConnection: async (req, res) => {

    },

    /* 수업방 연결  post : [ /lecture/invitation ] */
    createConnection: async (req, res) => {

    },

    /* 수업 초대  get : [ /lecture/invitation/:lid ] */
    getCode: async (req, res) => {

    }

}


module.exports = lecture;