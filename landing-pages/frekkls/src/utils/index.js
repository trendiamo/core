/* eslint-disable no-undef */
const slugify = require('slugify')

const blogPostUrl = (blogPostTitle, locale) => {
  const slugedBlogPosTitle = slugify(blogPostTitle, {
    replacement: '-',
    lower: true,
  })
  return `${locale.path}/blog/${slugedBlogPosTitle}`
}

module.exports = blogPostUrl
