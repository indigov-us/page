const UrlPrettifier = require('next-url-prettifier').default

const routes = [{
  page: 'article',
  prettyUrl: ({idSlug = ''}) => `/articles/${idSlug}`,
  prettyUrlPatterns: [
    '/articles/:idSlug'
  ]
}, {
  page: 'index',
  prettyUrl: '/',
  prettyUrlPatterns: ['/']
}]

const urlPrettifier = new UrlPrettifier(routes)

exports.default = routes
exports.Router = urlPrettifier
