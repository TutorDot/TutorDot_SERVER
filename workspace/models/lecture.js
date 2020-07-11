const pool = require('../modules/pool');
const table = 'lecture';

const lecture = {

    /* 수업 추가  post : [ /lecture ] */
    createLecture: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업 목록 조회  get : [ /lecture ] */
    getLectureAll: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업 상세 조회  get : [ /lecture/:lid ] */
    getLectureById: async () => {

        try {

        } catch (err) {

        }
    },

    /* 모든 게시글 조회  put : [ /lecture/:lid] */
    updateLecture: async () => {

        try {

        } catch (err) {

        }
    },

    /* 토글 수업목록 조회  get : [ /toggle ] */
    getLectureNames: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업방 나가기  delete : [ /lecture/:lid ] */
    deleteConnection: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업방 연결  post : [ /lecture/invitation ] */
    createConnection: async () => {

        try {

        } catch (err) {

        }
    },

    /* 수업 초대  get : [ /lecture/invitation/:lid ] */
    getCode: async () => {

        try {

        } catch (err) {

        }
    }
}

module.exports = lecture;