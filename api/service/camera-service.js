const fetch = require("node-fetch");
const NodeWebcam = require("node-webcam");
const Jimp = require("jimp");
const fs = require('fs');

const SECONDS_CUPTURE = 20
const NO_CONTENT_STATUS_CODE = 204

var opts1 = {
  width: 1280,
  height: 720,
  quality: 10,
  frames: 10,
  delay: 0,
  saveShots: true,
  output: "jpeg",

  device: false,
  callbackReturn: "buffer",
  verbose: false
};

var opts2 = {
  width: 1280,
  height: 720,
  quality: 10,
  frames: 10,
  delay: 0,
  saveShots: true,
  output: "jpeg",

  device: 2,
  callbackReturn: "buffer",
  verbose: false
};

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}


const checkNoContentResponse = async response => {
  let res;

  if (response.status === NO_CONTENT_STATUS_CODE) {
    return []
  } else {
    try {
      res = response.json()
    } catch (e) {

    }
    return res
  }
}

const preperDlRequest = (cameraId) => {
  console.log('preperDlRequest for camera: ' + cameraId);

  let imageOutputName = "compresed" + cameraId + ".jpg";

  Jimp.read("originalImage" + cameraId + ".jpg", async function (err, image) {
    if (err) throw err;
    image.resize(1280, 720)            // resize
      .quality(60)                 // set JPEG quality
      .write(imageOutputName); // save
    setTimeout(() => {
      imageOutputName = "compresed" + cameraId + ".jpg";
      let base64Image = base64_encode(imageOutputName)
      let query = "http://127.0.0.1:8000/Identification/";
      fetch(query, { method: 'POST', Headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "cameraId": cameraId, "image": base64Image }) })
        .then(checkNoContentResponse)
        .then(res => {
          // console.log(res)
          resolve(res);
        })
        .catch(e => {
          // console.log(e)
        });
    }, 1000) //wait ten seconds before continuing
  });
}

const InitCurrentImageSaver = async () => {
  setInterval(async () => {
    console.log('Camera 1, capture... ')
    var Webcam1 = NodeWebcam.create(opts1);

    Webcam1.capture("originalImage1", function (err, data) {
      if (data) {
        preperDlRequest(1)
      } else {
        // console.log('err')
        // console.log(err)
      }
    });

  }, SECONDS_CUPTURE * 1000)

  // uncoment this section for one camera uses.
  setInterval(async () => {
    console.log('Camera 2, capture... ')
    var Webcam2 = NodeWebcam.create(opts2);

    Webcam2.capture("originalImage2", function (err, data) {
      if (data) {
        preperDlRequest(2)
      } else {
        // console.log('err')
        // console.log(err)
      }
    });
  }, SECONDS_CUPTURE * 1000)

  console.log('\nSave image each ' + SECONDS_CUPTURE + ' seconds\n\n')
}

module.exports = {
  InitCurrentImageSaver,
  base64_encode
}