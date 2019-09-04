/* eslint-disable no-undef */
const path = require('path')
const { blogPostUrl } = require('./src/utils')

const BlogPost = path.resolve('src/dyn-pages/blog-post.js')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
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
              fluid(quality: 100) {
                aspectRatio
                src
                srcSet
                sizes
              }
            }
          }
        }
      }
    }
  `).then(response => {
    if (response.errors) throw response.errors

    response.data.allContentfulBlogPost.edges
      .map(e => e.node)
      .forEach(post => {
        createPage({
          path: blogPostUrl(post),
          component: BlogPost,
          context: { post, slug: post.slug },
        })
      })
  })
}
/* eslint-enable no-undef */
