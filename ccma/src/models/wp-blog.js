// @flow

const {INTEGER, STRING} = require('sequelize')

const sequelize = require('../lib/sequelize')

const WPBlog = sequelize.define('wp_blog', {
  blogId: {
    field: 'blog_id',
    primaryKey: true,
    type: INTEGER
  },
  domain: STRING
}, {
  timestamps: false
})

module.exports = WPBlog
