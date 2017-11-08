const UrlPrettifier = require('next-url-prettifier').default

// the order matters very much!
const routes = [{
  page: 'contact',
  prettyUrl: '/contact/'
}, {
  page: 'category',
  prettyUrl: ({slug = ''}) => `/category/${slug}/`,
  prettyUrlPatterns: '/category/:slug/'
}, {
  page: 'article',
  prettyUrl: ({category = '', idSlug = ''}) => `/${category}/${idSlug}/`,
  prettyUrlPatterns: '/:category/:idSlug/'
}, {
  page: 'page',
  prettyUrl: ({slug = ''}) => `/${slug}/`,
  prettyUrlPatterns: '/:slug/'
}, {
  page: 'index',
  prettyUrl: '/'
}]

const urlPrettifier = new UrlPrettifier(routes)

exports.default = routes
exports.Router = urlPrettifier
