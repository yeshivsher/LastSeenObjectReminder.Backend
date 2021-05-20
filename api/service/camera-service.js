const VideoCapture = require('camera-capture')

const fs = require('fs');
const SECONDS_CUPTURE = 0.1

const c = new VideoCapture.VideoCapture({
  mime: 'image/png'
})

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

const getNoImage = async () => {
  var bitmap = base64_encode(__dirname + url)

  console.log("🚀 ~ file: camera-service.js ~ line 13 ~ getNoImage ~ bitmap", bitmap)
  // convert binary data to base64 encoded string
  return bitmap;
}

const InitCurrentImageSaver = async () => {
  await c.initialize()

  setInterval(async () => {
    let f = await c.readFrame()
    fs.writeFileSync('./image/currentImage/tmp.png', f.data)

    console.log('Capture...')
  }, SECONDS_CUPTURE * 1000)

  console.log('\nSave image each ' + SECONDS_CUPTURE + ' seconds\nOutput: image/currentImage/tmp.png\n\n')
}

module.exports = {
  InitCurrentImageSaver,
  getNoImage,
  base64_encode
}