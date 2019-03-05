/* eslint-disable no-undef */
const path = require('path')
const blogPostUrl = require('./src/utils')

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//
//   return new Promise(resolve => {
//     deletePage(page)
//
//     Object.keys(locales).map(lang => {
//       const path = locales[lang].path + page.path
//       return createPage({
//         ...page,
//         path,
//         context: {
//           locale: lang,
//         },
//       })
//     })
//
//     resolve()
//   })
// }

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  return createPage({
    ...page,
    path: page.path,
    context: {
      locale: 'en-US',
    },
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
            slug
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
      createPage({
        path: blogPostUrl(blog.node, 'en-US'),
        component: BlogPost,
        context: {
          post: blog,
          locale: 'en-US',
        },
      })
    })
  })
}
/* eslint-enable no-undef */
