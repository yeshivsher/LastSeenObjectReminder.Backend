const serverRestApi = require('./api/web-api/server-rest-api')
const cameraService = require('./api/service/camera-service')

// Init servers.

/// uncomment only when url is correct
//cameraService.InitCurrentImageSaver()
serverRestApi.initRestApiServer()
