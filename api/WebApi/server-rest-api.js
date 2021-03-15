const express = require('express')
const bodyParser = require('body-parser')
const serverApi = require('./server-api')
const config = require('../../config')
const pjson = require('../../package.json');
const jsonParser = bodyParser.json()
const app = express()
const port = config.generalConfig.port

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

const initRestApiServer = () => {
    app.get('/api/:time', async (req, res) => {
        let time = req.params.time

        const result = await serverApi.GetLastSeenImage(time)
        res.send(result)
    })

    app.post('/X', jsonParser, async (req, res) => {
        let newCamera = req.body

        const result = await serverApi.GetLastSeenImage(newCamera)

        res.send(result)
    })


    app.get('/health', async (req, res) => {
        res.send('ok')
    })

    // Init server. 
    app.listen(port, '0.0.0.0', () => {
        console.log('Server listening on port', port)
    })
}

module.exports = {
    initRestApiServer: initRestApiServer
}