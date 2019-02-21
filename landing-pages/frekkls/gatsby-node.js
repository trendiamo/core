/* eslint-disable no-undef */
const locales = require('./locales')
const path = require('path')
const blogPostUrl = require('./src/utils')

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(lang => {
      const path = locales[lang].path + page.path
      return createPage({
        ...page,
        path,
        context: {
          locale: lang,
        },
      })
    })

    resolve()
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const BlogPost = path.resolve('src/components/blog-post.js')
  return graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            id
            title
            secondaryTitle
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
    if (response.errors) {
      throw response.errors
    }
    response.data.allContentfulBlogPost.edges.forEach(blog => {
      Object.keys(locales).forEach(locale => {
        createPage({
          path: blogPostUrl(blog.node, locale),
          component: BlogPost,
          context: {
            post: blog,
            locale,
          },
        })
      })
    })
  })
}
/* eslint-enable no-undef */
