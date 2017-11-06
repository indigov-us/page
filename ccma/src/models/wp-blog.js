// @flow

const {INTEGER, STRING} = require('sequelize')

const sequelize = require('../lib/sequelize')

const WPBlog = sequelize.define('wp_blog', {
  blogId: {
    field: 'blog_id',
    primaryKey: true,
    type: INTEGER
  },
  domain: STRING,
  siteId: {
    field: 'site_id',
    type: INTEGER
  }
}, {
  timestamps: false
})

module.exports = WPBlog
