/* eslint-disable no-undef */
const blogCategoryUrl = blogCategory => `/magazine/${blogCategory.slug}`

const blogPostUrl = blogPost => `/magazine/article/${blogPost.slug}`

const blogHeaderLinks = data => [
  { target: '/magazine', text: 'Magazine' },
  ...data.map(e => ({ target: blogCategoryUrl(e), text: e.name })),
]

module.exports = { blogCategoryUrl, blogHeaderLinks, blogPostUrl }
/* eslint-enable no-undef */
