const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('category', '/category/:slug/:subcategories*')
routes.add('article', '/:category+/:idSlug')
routes.add('page', '/:slug')
