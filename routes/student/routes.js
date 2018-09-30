var express = require('express');
var router = express.Router();

// Controllers
var studentAuth = require('../../controller/student/auth');
var studentControls = require('../../controller/student/controls');
var profControls = require('../../controller/prof/controls')
// Middlewares
var StudentTokenMiddleware = require("../../middlewares/student/TokenMiddleware");

// -> /api/student/auth
router.post('/auth/register', studentAuth.register);
router.post('/auth/login', studentAuth.login);

// // -> /api/student/
router.get('/user', StudentTokenMiddleware.verify, studentControls.studentInfo);
router.post('/check', StudentTokenMiddleware.verify, studentControls.checkStudent);

router.get('/question', StudentTokenMiddleware.verify, profControls.checkQuestion);

module.exports = router;