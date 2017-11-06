// @flow

const Koa = require('koa')
const Sequelize = require('sequelize')

const app = new Koa()
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
)

const WPBlog = sequelize.define('wp_blog', {
  blogId: {
    field: 'blog_id',
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  domain: Sequelize.STRING
}, {
  timestamps: false
})

app.use(async ctx => {
  const blogs = await WPBlog.findAll()
  ctx.body = blogs
})

app.listen(3000)
