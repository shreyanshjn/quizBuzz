const fr = require('face-recognition')
const fs = require('fs')

const student_1_1 = fr.loadImage('../uploads/student/faces/aniket01.png')
const student_1_2 = fr.loadImage('../uploads/student/faces/aniket02.png')
const student_1_3 = fr.loadImage('../uploads/student/faces/aniket03.png')
const student_1_4 = fr.loadImage('../uploads/student/faces/aniket04.png')
const student_1_5 = fr.loadImage('../uploads/student/faces/aniket05.png')
const student_1_6 = fr.loadImage('../uploads/student/faces/aniket06.png')
const student_1_7 = fr.loadImage('../uploads/student/faces/aniket07.png')
const student_1_8 = fr.loadImage('../uploads/student/faces/aniket08.png')
const student_1_9 = fr.loadImage('../uploads/student/faces/aniket09.png')
const student_1_10 = fr.loadImage('../uploads/student/faces/aniket10.png')

const student_2_1 = fr.loadImage('../uploads/student/faces/shivashi01.png')
const student_2_2 = fr.loadImage('../uploads/student/faces/shivashi02.png')
const student_2_3 = fr.loadImage('../uploads/student/faces/shivashi03.png')
const student_2_4 = fr.loadImage('../uploads/student/faces/shivashi04.png')
const student_2_5 = fr.loadImage('../uploads/student/faces/shivashi05.png')
const student_2_6 = fr.loadImage('../uploads/student/faces/shivashi06.png')
const student_2_7 = fr.loadImage('../uploads/student/faces/shivashi07.png')
const student_2_8 = fr.loadImage('../uploads/student/faces/shivashi08.png')
const student_2_9 = fr.loadImage('../uploads/student/faces/shivashi09.png')
const student_2_10 = fr.loadImage('../uploads/student/faces/shivashi10.png')

const student_3_1 = fr.loadImage('../uploads/student/faces/shreyansh01.png')
const student_3_2 = fr.loadImage('../uploads/student/faces/shreyansh02.png')
const student_3_3 = fr.loadImage('../uploads/student/faces/shreyansh03.png')
const student_3_4 = fr.loadImage('../uploads/student/faces/shreyansh04.png')
const student_3_5 = fr.loadImage('../uploads/student/faces/shreyansh05.png')
const student_3_6 = fr.loadImage('../uploads/student/faces/shreyansh06.png')
const student_3_7 = fr.loadImage('../uploads/student/faces/shreyansh07.png')
const student_3_8 = fr.loadImage('../uploads/student/faces/shreyansh08.png')
const student_3_9 = fr.loadImage('../uploads/student/faces/shreyansh09.png')
const student_3_10 = fr.loadImage('../uploads/student/faces/shreyansh10.png')

const student_4_1 = fr.loadImage('../uploads/student/faces/tushar01.png')
const student_4_2 = fr.loadImage('../uploads/student/faces/tushar02.png')
const student_4_3 = fr.loadImage('../uploads/student/faces/tushar03.png')
const student_4_4 = fr.loadImage('../uploads/student/faces/tushar04.png')
const student_4_5 = fr.loadImage('../uploads/student/faces/tushar05.png')
const student_4_6 = fr.loadImage('../uploads/student/faces/tushar06.png')
const student_4_7 = fr.loadImage('../uploads/student/faces/tushar07.png')
const student_4_8 = fr.loadImage('../uploads/student/faces/tushar08.png')
const student_4_9 = fr.loadImage('../uploads/student/faces/tushar09.png')
const student_4_10 = fr.loadImage('../uploads/student/faces/tushar10.png')

console.log('Images Loaded')

const recognizer = fr.FaceRecognizer()

console.log('Recognizer Initiated')

const student_1 = [
    student_1_1,
    student_1_2,
    student_1_3,
    student_1_4,
    student_1_5,
    student_1_6,
    student_1_7,
    student_1_8,
    student_1_9,
    student_1_10
]

const student_2 = [
    student_2_1,
    student_2_2,
    student_2_3,
    student_2_4,
    student_2_5,
    student_2_6,
    student_2_7,
    student_2_8,
    student_2_9,
    student_2_10
]

const student_3 = [
    student_3_1,
    student_3_2,
    student_3_3,
    student_3_4,
    student_3_5,
    student_3_6,
    student_3_7,
    student_3_8,
    student_3_9,
    student_3_10
]

const student_4 = [
    student_4_1,
    student_4_2,
    student_4_3,
    student_4_4,
    student_4_5,
    student_4_6,
    student_4_7,
    student_4_8,
    student_4_9,
    student_4_10
]

// const numJitters = 15

console.log('Training Bot...')

recognizer.addFaces(student_1, 'Aniket')
console.log('25% Trained')
recognizer.addFaces(student_2, 'Shivanshi')
console.log('50% Trained')
recognizer.addFaces(student_3, 'Shreyanss')
console.log('75% Trained')
recognizer.addFaces(student_4, 'Tushar')
console.log('100% Bot Trained')

console.log('Loading test images')

const testImage = fr.loadImage('../uploads/student/images/testImage.png')

console.log('Predicting best results')

const bestPrediction = recognizer.predictBest(testImage)

console.log(bestPrediction)

const modelState = recognizer.serialize()

fs.writeFileSync('model.json', JSON.stringify(modelState))
console.log('Model Created')
