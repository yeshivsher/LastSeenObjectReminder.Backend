const extractFrames = require('ffmpeg-extract-frames')

const getIsObjectInTheImageOrNot = (clientId) => {
}

const InitCurrentImageSaver = async () => {
    await extractFrames({
        input: '../../video/testVideo.mp4',
        output: './currentImage-%i.jpg',
        offsets: [
            1000
        ]
    })
}


module.exports = { InitCurrentImageSaver, getIsObjectInTheImageOrNot }