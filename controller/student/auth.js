var moment = require('moment');

var User = require("../../models/student/Student");
var Student_Token = require("../../models/student/Student_Token");
var TokenHelper = require("../../helpers/TokenHelper");

exports.register = function (req, res) {
    if (req.body && req.body.name && req.body.email && req.body.password && req.body.enrollment) {
        req.body.name = req.body.name.toLowerCase();
        req.body.name = req.body.name.trim();

        req.body.enrollment = req.body.enrollment.trim();

        if (!req.body.name) {
            return res.json({ success: false, msg: 'Invalid Name' });
        }

        if (!req.body.enrollment) {
            return res.json({ success: false, msg: 'Invalid enrollment' });
        }

        // var baseImg = req.body.image.split(',')[1];
        // var binaryData = new Buffer(baseImg, 'base64');
        // var ext = req.body.format.split('/')[1];
        // var updateData = {
        //     image: `${req.body.username}.${ext}`
        // };
        var newUser = new User({
            enrollment: req.body.enrollment,
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        });

        newUser.save(function (err, user) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Error.', error: err });
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'Enrollment already exists' });
            }
            return res.json({ success: true, msg: 'Successfully created new user.' });
        });

    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.login = function (req, res) {
    if (req.body.enrollment) {
        req.body.enrollment = req.body.enrollment.toLowerCase();
        req.body.enrollment = req.body.enrollment.trim();
    }

    User.findOne({
        enrollment: req.body.enrollment
    })
        .select('enrollment email password name')
        .exec(function (err, user) {
            if (err) return res.status(400).send({ success: false, msg: "Something went wrong " });

            if (!user) {
                return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        Student_Token.find({ enrollment: req.body.enrollment }).sort({ 'updated_date': 1 }).exec(function (err, tokens) {
                            if (err) {
                                return res.status(400).send({ success: false, msg: 'Unable To find token' });
                            } else {
                                var genratedToken = TokenHelper.generateUserToken(user.enrollment, user.email);
                                var newToken = {
                                    enrollment: req.body.enrollment,
                                    user_id: user._id,
                                    token: genratedToken,
                                    expiration_time: moment().day(30),
                                    updated_date: new Date()
                                };
                                var responseData = {
                                    name: user.name,
                                    email: user.email,
                                    enrollment: user.enrollment
                                };
                                if (tokens.length > 2 && tokens[0]) {
                                    Student_Token.update({ _id: tokens[0]._id }, newToken)
                                        .exec(function (err) {
                                            if (err) {
                                                return res.status(400).send({ success: false, msg: 'Unable Create Token' });
                                            }
                                            res.json({ success: true, token: genratedToken, body: responseData });
                                        });
                                } else {
                                    var addToken = new Student_Token(newToken);
                                    addToken.save(function (err) {
                                        if (err) {
                                            return res.status(400).send({ success: false, msg: 'Token Already Exists' });
                                        }
                                        res.json({ success: true, token: genratedToken, body: responseData });
                                    });
                                }
                            }
                        });
                    } else {
                        return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
};
