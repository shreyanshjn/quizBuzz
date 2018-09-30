var moment = require('moment');

var User = require("../../models/prof/Professor");
var Professor_Token = require("../../models/prof/Prof_Token");
var TokenHelper = require("../../helpers/TokenHelper");

exports.register = function (req, res) {
    console.log(req);
    if (req.body && req.body.username && req.body.password && req.body.name && req.body.email) {
        req.body.username = req.body.username.toLowerCase();
        req.body.username = req.body.username.trim();

        req.body.name = req.body.name.trim();

        if (!req.body.username) {
            return res.status(400).send({ success: false, msg: 'Invalid Username' });
        }

        if (!req.body.name) {
            return res.status(400).send({ success: false, msg: 'Invalid Name' });
        }

        var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
        });

        newUser.save(function (err, user) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Error.', error: err });
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'Username already exists' });
            }
            return res.json({ success: true, msg: 'Successfully created new user.' });
        });


    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.login = function (req, res) {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
        req.body.username = req.body.username.trim()
    }

    User.findOne({
        username: req.body.username
    })
        .select('username email password name')
        .exec(function (err, user) {
            if (err) return res.status(400).send({ success: false, msg: "Something went wrong " });

            if (!user) {
                return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        Professor_Token.find({ username: req.body.username }).sort({ 'updated_date': 1 }).exec(function (err, tokens) {
                            if (err) {
                                return res.status(400).send({ success: false, msg: 'Unable To find token' });
                            } else {
                                var genratedToken = TokenHelper.generateAdminToken(req.body.username);
                                var newToken = {
                                    username: req.body.username,
                                    user_id: user._id,
                                    token: genratedToken,
                                    expiration_time: moment().day(30),
                                    updated_date: new Date()
                                };
                                var responseData = {
                                    name: user.name,
                                    email: user.email
                                };
                                if (tokens.length > 2 && tokens[0]) {
                                    Professor_Token.update({ _id: tokens[0]._id }, newToken)
                                        .exec(function (err) {
                                            if (err) {
                                                return res.status(400).send({ success: false, msg: 'Unable Create Token' });
                                            }
                                            res.json({ success: true, token: genratedToken, body: responseData });
                                        });
                                } else {
                                    var addToken = new Professor_Token(newToken);
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
