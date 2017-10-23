const UrlPrettifier = require('next-url-prettifier').default

const routes = [{
  page: 'article',
  prettyUrl: ({idSlug = ''}) => `/articles/${idSlug}`,
  prettyUrlPatterns: [
    '/articles/:idSlug'
  ]
}, {
  page: 'page',
  prettyUrl: ({idSlug = ''}) => `/pages/${idSlug}`,
  prettyUrlPatterns: [
    '/pages/:idSlug'
  ]
}, {
  page: 'question',
  prettyUrl: ({idSlug = ''}) => `/questions/${idSlug}`,
  prettyUrlPatterns: [
    '/questions/:idSlug'
  ]
}, {
  page: 'search',
  prettyUrl: '/search'
}, {
  page: 'contact',
  prettyUrl: '/contact'
}, {
  page: 'index',
  prettyUrl: '/',
  prettyUrlPatterns: ['/']
}]

const urlPrettifier = new UrlPrettifier(routes)

exports.default = routes
exports.Router = urlPrettifier
