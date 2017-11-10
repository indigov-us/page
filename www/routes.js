const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('home', '/', 'index')
routes.add('contact')
routes.add('category', '/category/:slug/:subcategories*')
routes.add('article', '/:category+/:idSlug')
routes.add('page', '/:slug')
