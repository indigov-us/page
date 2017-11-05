const UrlPrettifier = require('next-url-prettifier').default

const routes = [{
  page: 'article',
  prettyUrl: ({idSlug = ''}) => `/articles/${idSlug}/`,
  prettyUrlPatterns: [
    '/articles/:idSlug/'
  ]
}, {
  page: 'question',
  prettyUrl: ({idSlug = ''}) => `/questions/${idSlug}/`,
  prettyUrlPatterns: [
    '/questions/:idSlug/'
  ]
}, {
  page: 'page',
  prettyUrl: ({slug = ''}) => `/pages/${slug}/`,
  prettyUrlPatterns: [
    '/pages/:slug/'
  ]
}, {
  page: 'search',
  prettyUrl: '/search/'
}, {
  page: 'contact',
  prettyUrl: '/contact/'
}, {
  page: 'index',
  prettyUrl: '/',
  prettyUrlPatterns: ['/']
}]

const urlPrettifier = new UrlPrettifier(routes)

exports.default = routes
exports.Router = urlPrettifier