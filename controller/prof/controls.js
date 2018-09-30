var User = require("../../models/prof/Professor");

exports.userInfo = function (req, res) {
    User.findOne({
        username: req.locals.username
    })
        .select('name email')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    msg: 'Unable to connect to database. Please try again.',
                    error: err
                })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            } else {
                return res.json({ success: true, msg: 'User Data Found', body: user });
            }
        });
};

var Question = require("../../models/prof/Question");

exports.question = function (req, res) {
    if (req.body && req.body.topic && req.body.question_one && req.body.question_two && req.body.question_four && req.body.question_four && req.body.question_five) {
        req.body.topic = req.body.topic.trim();
        req.body.question_one = req.body.question_one.trim();
        req.body.question_two = req.body.question_two.trim();
        req.body.question_three = req.body.question_three.trim();
        req.body.question_four = req.body.question_four.trim();
        req.body.question_five = req.body.question_five.trim();

        if (!req.body.topic) {
            return res.status(400).send({ success: false, msg: 'Invalid topic' });
        }

        if (!req.body.question_one) {
            return res.status(400).send({ success: false, msg: 'Invalid question_one' });
        }
        if (!req.body.question_two) {
            return res.status(400).send({ success: false, msg: 'Invalid question_two' });
        }
        if (!req.body.question_three) {
            return res.status(400).send({ success: false, msg: 'Invalid question_three' });
        }
        if (!req.body.question_four) {
            return res.status(400).send({ success: false, msg: 'Invalid question_four' });
        }
        if (!req.body.question_five) {
            return res.status(400).send({ success: false, msg: 'Invalid question_five' });
        }

        console.log('dssa');

        var newQuestion = new Question({
            topic: req.body.topic,
            question_one: req.body.question_one,
            question_two: req.body.question_two,
            question_three: req.body.question_three,
            question_four: req.body.question_four,
            question_five: req.body.question_five
        });

        newQuestion.save(function (err, user) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Error.', error: err });
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'question already exists' });
            }
            return res.json({ success: true, msg: 'Successfully question created.' });
        });

    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.checkQuestion = function (req, res) {
    Question.find({
    })
        .select('topic question_one question_two question_three question_four question_five ')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    msg: 'Unable to connect to database. Please try again.',
                    error: err
                })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            } else {
                return res.json({ success: true, msg: 'User Data Found', body: user });
            }
        });
};