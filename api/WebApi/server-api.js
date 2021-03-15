const fetch = require("node-fetch");
const config = require("../../config");

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

const GetLastSeenImage = async time => {
    let query = url + "/X/" + time
    let currentTime =  new Date()

    return "the current time is: " + currentTime.toLocaleTimeString()

    // return new Promise(async (resolve, reject) => {
    //     let result = {};

    //     fetch(query)
    //         .then(checkNoContentResponse)
    //         .then(data => {
    //             result = data;
    //             resolve(result);
    //         })
    //         .catch(e => {

    //             reject(result);
    //         });
    // });
};

module.exports = {
    GetLastSeenImage
}