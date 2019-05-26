const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function (req, res) {
  setTimeout(() => {
    res.json(req.query)
  }, 5000)
})

router.post("/base/post", function (req, res) {
  res.json(req.body)
})

router.get('/error/timeout', function (req, res) {
  setTimeout(() => {
    res.json(req.query)
  }, 5000)
})

router.get('/error/network', function (req, res) {
  setTimeout(() => {
    res.json(req.query)
  }, 5000)
})

router.post("/err/post500", function (req, res) {
  res.status(500)
  res.end()
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
