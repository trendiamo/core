/* eslint-disable no-undef */
const locales = require('../../locales')

const blogPostUrl = (blogPost, locale) => `${locales[locale].path}/blog/${blogPost.slug}`

module.exports = blogPostUrl
