// @flow

// global fetch is required for react-apollo
require('es6-promise').polyfill()
require('isomorphic-fetch')

const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
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

  server.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET
  }))

  // for parsing the body on wordpress's customizer calls
  server.use(bodyParser.urlencoded({extended: true}))

  server.use(handler)

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
