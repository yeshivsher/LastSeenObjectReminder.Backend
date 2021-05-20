const serverRestApi = require('./api/web-api/server-rest-api')
const cameraService = require('./api/service/camera-service')

// Init servers.
// cameraService.InitCurrentImageSaver()
serverRestApi.initRestApiServer()
