/* eslint-disable no-undef */
const slugify = require('slugify')
const locales = require('../../locales')

const blogPostUrl = (blogPost, locale) => {
  const slugedBlogPosTitle = slugify(blogPost.title, {
    replacement: '-',
    lower: true,
  })
  return `${locales[locale].path}/blog/${slugedBlogPosTitle}`
}

module.exports = blogPostUrl
