// @flow

const {INTEGER, STRING} = require('sequelize')

const sequelize = require('../lib/sequelize')

const WPBlogOption = (blogId: number) => sequelize.define(blogId === 1 ? 'wp_option' : `wp_${blogId}_option`, {
  optionId: {
    field: 'option_id',
    primaryKey: true,
    type: INTEGER
  },
  optionName: {
    field: 'option_name',
    type: STRING
  },
  optionValue: {
    field: 'option_value',
    type: STRING
  }
}, {
  timestamps: false
})

const cache = new Map()

module.exports = (blogId: number) => {
  const cached = cache.get(blogId)
  if (cached) return cached

  const WPOption = WPBlogOption(blogId)
  cache.set(blogId, WPOption)
  return WPOption
}
