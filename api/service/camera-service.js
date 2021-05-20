const VideoCapture = require('camera-capture')
const fetch = require("node-fetch");

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

const checkNoContentResponse = async response => {
  if (response.status === NO_CONTENT_STATUS_CODE) {
    return []
  } else {
    return response.json()
  }
}

const getNoImage = async (url) => {
  var bitmap = base64_encode(__dirname + url)

  console.log("🚀 ~ file: camera-service.js ~ line 13 ~ getNoImage ~ bitmap", bitmap)
  // convert binary data to base64 encoded string
  return bitmap;
}

const InitCurrentImageSaver = async () => {
  await c.initialize()

  setInterval(async () => {
    let f = await c.readFrame()
    let result = {};
    let query = "DLURL/";

    fs.writeFileSync('./image/currentImage/tmpCamera1.png', f.data)
    console.log('Camera 1, capture... ')

    fetch(query)
      .then(checkNoContentResponse)
      .then(data => {
        result = data;
        resolve(result);
      })
      .catch(e => {
        result = e
        reject(result);
      });
    console.log('Send camera 1 pic to DL service...')

  }, SECONDS_CUPTURE * 1000)

  // Add camera 2
  // setInterval(async () => {
  //   let f = await c.readFrame()
  //   let result = {};
  //   let query = "DLURL/";

  //   fs.writeFileSync('./image/currentImage/tmpCamera2.png', f.data)
  //   console.log('Camera 2, capture... ')

  //   fetch(query)
  //     .then(checkNoContentResponse)
  //     .then(data => {
  //       result = data;
  //       resolve(result);
  //     })
  //     .catch(e => {
  //       result = e
  //       reject(result);
  //     });
  //   console.log('Send camera 2 pic to DL service...')
  // }, SECONDS_CUPTURE * 1000)

  console.log('\nSave image each ' + SECONDS_CUPTURE + ' seconds\nOutput: image/currentImage/tmp.png\n\n')
}

module.exports = {
  InitCurrentImageSaver,
  getNoImage,
  base64_encode
}