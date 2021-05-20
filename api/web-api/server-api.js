const fetch = require("node-fetch");
const config = require("../../config");
const cameraService = require('../../api/service/camera-service')
var fs = require('fs');

const options = {
    string: true,
    headers: {
      "User-Agent": "my-app"
    }
  };

const url = config.generalConfig.url;

const NO_CONTENT_STATUS_CODE = 204

//####################################################
// helper functions

const checkNoContentResponse = async response => {
    if (response.status === NO_CONTENT_STATUS_CODE) {
        return []
    } else {
        return response.json()
    }
}

const GetLastseenimagebycattegoryname = async cattegoryName => {
    let result = {}
    const url = `/../../image/lastSeenImages/${cattegoryName}.png`

    result = cameraService.base64_encode(__dirname + url)

    return result 
};

const getNoImage = async (path) => {
    let result = {}
    const url = '/../../image/no-image.png'
    
    result = cameraService.base64_encode(__dirname + url)

    return result // "cGF0aC90by9maWxlLmpwZw=="
}

module.exports = {
    GetLastseenimagebycattegoryname,
    getNoImage
}