// @flow

// global fetch is required for react-apollo
require('es6-promise').polyfill()
require('isomorphic-fetch')

const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const next = require('next')

const Router = require('./routes').Router

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

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

  // because of the wildcard /:slug route, we have to manually match
  // certain things before we hit the routes from routes.js
  server.use((req, res, next) => {
    if (/\.js|\.css|_next|favicon\.ico/.test(req.path)) {
      return handle(req, res)
    }
    next()
  })

  // dynamic routes
  Router.forEachPattern((page, pattern, defaultParams) => (
    server.use(pattern, (req, res) => (
      app.render(req, res, `/${page}`, Object.assign({}, defaultParams, req.query, req.params))
    )
  )))

  // let next handle everything else
  server.get('*', (req, res) => handle(req, res))

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
