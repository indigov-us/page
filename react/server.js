// @flow

// global fetch is required for react-apollo
require('es6-promise').polyfill()
require('isomorphic-fetch')

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

  server.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET
  }))

  Router.forEachPattern((page, pattern, defaultParams) => (
    server.use(pattern, (req, res) => (
      app.render(req, res, `/${page}`, Object.assign({}, defaultParams, req.query, req.params))
    )
  )))

  server.get('*', (req, res) => handle(req, res))

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
