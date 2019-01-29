const locales = require('./locales')

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
          locale: lang
        }
      })
    })

    resolve()
  })
}
