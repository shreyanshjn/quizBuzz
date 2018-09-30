var express = require('express');
var router = express.Router();

// Routes
var profRoutes = require('./prof/routes');
var studentRoutes = require('./student/routes');

// Controllers
var viewController = require('../controller/view_controller');

// -> /api
router.use('/api/prof', profRoutes);
router.use('/api/student', studentRoutes);

// -> /*
router.get('/*', viewController);

module.exports = router;
