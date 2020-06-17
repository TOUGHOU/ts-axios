const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const router = express.Router()

registerSimpleAndBase()

registerErrorApi()

registerExtendApi()

registerInterceptors()

registerCondigApi()

app.use(router)

const port = process.env.PORT || 8090
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function registerInterceptors() {
  router.get('/interceptor/get', function(req, res) {
    res.json('ok')
  })
}

function registerSimpleAndBase() {
  router.get('/simple/get', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    res.json({
      msg: `hello world`
    })
  })

  router.get('/base/get', function(req, res) {
    setTimeout(() => {
      res.json(req.query)
    }, 5000)
  })

  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })
}

function registerErrorApi() {
  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json(req.query)
    }, 5000)
  })

  router.get('/error/network', function(req, res) {
    setTimeout(() => {
      res.json(req.query)
    }, 5000)
  })

  router.post('/err/post500', function(req, res) {
    res.status(500)
    res.end()
  })
}

function registerExtendApi() {
  router.get('/extend/get', function(req, res) {
    res.send('/extend/get')
  })
  router.put('/extend/put', function(req, res) {})

  router.post('/extend/hello', function(req, res) {
    res.send('/extend/hello')
  })

  router.post('/extend/world', function(req, res) {
    res.send('/extend/world')
  })

  router.post('/extend/post', function(req, res) {})
  router.delete('/extend/delete', function(req, res) {})
  router.options('/extend/options', function(req, res) {})
  router.head('/extend/head', function(req, res) {})
  router.patch('/extend/patch', function(req, res) {})

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'kkk',
        age: 101
      }
    })
  })
}

function registerCondigApi() {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}
