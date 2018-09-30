var User = require("../../models/student/Student");
const fr = require('face-recognition');
const detector = fr.FaceDetector()

const modelState = require('../model.json');

exports.studentInfo = function (req, res) {
    User.findOne({
        enrollment: req.locals.enrollment
    })
        .select('enrollment name email')
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

exports.checkStudent = function (req, res) {
    if (req.body.image && req.body.format) {
        var enrollment = req.locals.enrollment;
        var img = req.body.image;
        var format = req.body.format;

        var baseImg = img.split(',')[1];
        var binaryData = new Buffer(baseImg, 'base64');
        var ext = format.split('/')[1];
        var updateData = {image : `${enrollment}.${ext}`};

        const url = `/uploads/student/images/${updateData.image}`;
        require("fs").writeFile(`./uploads/student/images/${updateData.image}`, binaryData, function(err) {
            if(err) {
                return res.status(400).send({ success: false, msg:"something went wrong"});
            } else {
                const recognizer = fr.FaceRecognizer()
                recognizer.load(modelState)

                const testImage = fr.loadImage(`./uploads/student/images/${updateData.image}`)
                // const expectedUser = enrollment

                const predictions = recognizer.predict(testImage)

                const matchedUsers = []
                if ( predictions ) {
                    if ( predictions.length > 0 ) {
                        console.log(predictions)
                        for (let i = 0; i < predictions.length; i++) {
                            if (predictions[i].distance*100 < 60 ) {
                                matchedUsers.push(predictions[i])
                            }
                        }
                    } else {
                        console.log('Person Not Recognized')
                    }
                }
                const faceImages = detector.detectFaces(testImage)
                console.log(faceImages)
                const bestPrediction = recognizer.predictBest(testImage)
                if (matchedUsers.length > 0 && faceImages.length > 0) {
                    if (faceImages.length === 1) {
                        return res.json({ success: true, msg: `Detected User ${bestPrediction.className}.` })
                    } else {
                        res.json({ success: true, msg: `${faceImages.length} Users Detected.` })
                    }
                    // let userList = ""
                    // for (let i = 0; i < matchedUsers.length; i++) {
                    //     console.log(`${matchedUsers[i].className} found`)
                    //     userList = userList + ' ' + matchedUsers[i].className
                    // }
                    // return res.json({ success: true, msg: `Detected User ${bestPrediction.className}.` })
                // }
                //  else if (matchedUsers.length === 1) {
                //     if (expectedUser === bestPrediction.className) {
                //         console.log(`${bestPrediction.className} solving paper`)
                //         return res.json({ success: true, msg: `${bestPrediction.className} solving paper` })
                //     } else {
                //         console.log(`${expectedUser} replaced by ${bestPrediction.className}`)
                //         return res.json({ success: true, msg: `${expectedUser} replaced by ${bestPrediction.className}` })
                //     }
                } else {
                    console.log('No one recognized with threshold probablity')
                    return res.json({ success: true, msg: 'No one recognized with threshold probablity' })
                }
                // console.log(predictions, bestPrediction, matchedUsers)
            }
        })
    }
}