const fr = require('face-recognition')

//load images from disk
const image1 = fr.loadImage('/faces/howard_1.png')
const image2 = fr.loadImage('/faces/howard_10.png')

//displaying images
const win = new fr.ImageWindow()

// display image
win.setImage(image)

// drawing the rectangle into the displayed image
win.addOverlay(rectangle)

// pause program until key pressed
fr.hitEnterToContinue()
