const fr = require('face-recognition')

const modelState = require('./model.json')

const recognizer = fr.FaceRecognizer()

recognizer.load(modelState)

const testImage = fr.loadImage('../uploads/student/images/shreyansh11.png')
const expectedUser = 'howard'

const predictions = recognizer.predict(testImage)

const matchedUsers = []
if ( predictions ) {
    if ( predictions.length > 0 ) {
        for (let i = 0; i < predictions.length; i++) {
            if (predictions[i].distance*100 < 10 ) {
                matchedUsers.push(predictions[i])
            }
        }
    } else {
        console.log('Person Not Recognized')
    }
}

const bestPrediction = recognizer.predictBest(testImage)


if (matchedUsers.length > 1) {
    console.log('Fcking Cheater')
    for (let i = 0; i < matchedUsers.length; i++) {
        console.log(`${matchedUsers[i].className} found`)
    }
} else if (matchedUsers.length === 1) {
    if (expectedUser === bestPrediction.className) {
        console.log(`${bestPrediction.className} solving paper`)
    } else {
        console.log(`${expectedUser} replaced by ${bestPrediction.className}`)
    }
} else {
    console.log('No one recognized with threshold probablity')
}


console.log(predictions, bestPrediction, matchedUsers)
