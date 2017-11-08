const UrlPrettifier = require('next-url-prettifier').default

const routes = [{
  page: 'category',
  prettyUrl: ({slug = ''}) => `/category/${slug}/`,
  prettyUrlPatterns: '/category/:slug/'
}, {
  page: 'article',
  prettyUrl: ({category = '', idSlug = ''}) => `/${category}/${idSlug}/`,
  prettyUrlPatterns: '/:category/:idSlug/'
}, {
  page: 'contact',
  prettyUrl: '/contact'
}, {
  page: 'page',
  prettyUrl: ({slug = ''}) => `/${slug}/`,
  prettyUrlPatterns: '/:slug/'
}]

const urlPrettifier = new UrlPrettifier(routes)

exports.default = routes
exports.Router = urlPrettifier
