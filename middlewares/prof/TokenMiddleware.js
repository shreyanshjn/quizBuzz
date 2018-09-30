var moment = require('moment');

var Prof_Token = require("../../models/prof/Prof_Token");

exports.verify = (req, res, next) => {
    var authHeader = req.get('Authorization')
    if (authHeader !== undefined) {
        // Find token in db
        Prof_Token.findOne({
            token: authHeader
        }, function (err, user) {
            if (err) {
                return res.status(403).send({ success: false, msg: 'Token Error' });
            };
            if (!user) {
                return res.status(403).send({ success: false, msg: 'Invalid Token' });
            } else if (moment() > user.expirationTime) {
                // If token expired
                return res.status(403).send({ success: false, message: 'Token Expired' });
            } else {
                req.locals = {
                    _id: user.user_id,
                    username: user.username
                };
                next();
            }
        });
    } else {
        return res.status(403).send({ message: 'Token Not Found' })
    }
}
