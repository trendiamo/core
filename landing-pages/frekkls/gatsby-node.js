/* eslint-disable no-undef */
const path = require('path')
const { blogCategoryUrl, blogPostUrl } = require('./src/utils')

const BlogCategory = path.resolve('src/dyn-pages/blog-category.js')
const BlogPost = path.resolve('src/dyn-pages/blog-post.js')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allContentfulBlogCategory {
        edges {
          node {
            name
            slug
          }
        }
      }
      allContentfulBlogPost {
        edges {
          node {
            categories {
              slug
            }
            title
            slug
            description {
              description
            }
            keywords
            authorName
            publishingDate
            titleImageCredit {
              childContentfulRichText {
                html
              }
            }
            text {
              childContentfulRichText {
                html
              }
            }
            authorImage {
              fixed(width: 120) {
                src
              }
            }
            titleImage {
              fixed(width: 1280) {
                src
              }
            }
          }
        }
      }
    }
  `).then(response => {
    if (response.errors) throw response.errors

    response.data.allContentfulBlogCategory.edges
      .map(e => e.node)
      .forEach(category => {
        createPage({
          path: blogCategoryUrl(category),
          component: BlogCategory,
          context: { category, slug: category.slug },
        })
      })

    response.data.allContentfulBlogPost.edges
      .map(e => e.node)
      .forEach(post => {
        createPage({
          path: blogPostUrl(post),
          component: BlogPost,
          context: { post, slug: post.slug, categorySlugs: post.categories.map(e => e.slug) },
        })
      })
  })
}
/* eslint-enable no-undef */
