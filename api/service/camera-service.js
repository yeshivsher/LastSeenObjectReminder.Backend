const VideoCapture = require('camera-capture')

const fs = require('fs');
const SECONDS_CUPTURE = 1

const c = new VideoCapture.VideoCapture({
  mime: 'image/png'
})

const InitCurrentImageSaver = async () => {
  await c.initialize()

  setInterval(async () => {
    let f = await c.readFrame()
    fs.writeFileSync('./image/currentImage/tmp.png', f.data)
  }, SECONDS_CUPTURE * 1000)

  console.log('Save image each ' + SECONDS_CUPTURE + ' seconds')
}

module.exports = { InitCurrentImageSaver }