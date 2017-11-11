// @flow

// global fetch is required for react-apollo
require('isomorphic-unfetch')

const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const next = require('next')

const routes = require('./routes')

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.use(helmet())

  // force https urls in production
  if (process.env.NODE_ENV === 'production') {
    server.use((req, res, next) => {
      if (/^http$/i.test(req.get('x-forwarded-proto'))) {
        return res.redirect(301, `https://${req.hostname}${req.originalUrl}`)
      }
      next()
    })
  }

  // route things like /favicon.ico to /static/favicon.ico
  server.use(express.static('static'))

  // for parsing the body on wordpress's customizer calls
  server.use(bodyParser.urlencoded({extended: true}))

  server.use(handler)

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
