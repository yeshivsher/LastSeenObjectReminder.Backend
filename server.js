const serverRestApi = require('./api/WebApi/server-rest-api')
const dlApi = require('./api/DL/dl-api')

// Init servers.
dlApi.InitCurrentImageSaver()
serverRestApi.initRestApiServer()