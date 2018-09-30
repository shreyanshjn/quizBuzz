var express = require('express');
var router = express.Router();

// Controllers
var profAuth = require('../../controller/prof/auth');
var profControls = require('../../controller/prof/controls');

// Middlewares
var ProfTokenMiddleware = require("../../middlewares/prof/TokenMiddleware");

// -> /api/prof/auth
router.post('/auth/register', profAuth.register);
router.post('/auth/login', profAuth.login);

// // -> /api/prof/
router.post('/user', ProfTokenMiddleware.verify, profControls.question);

module.exports = router;