const { BLOCKS, INLINES } = require('@contentful/rich-text-types')

require('dotenv').config()
const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
}
const { spaceId, accessToken } = contentfulConfig
if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: `Frekkls`,
    description: ``,
    author: `@trendiamo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `@contentful/gatsby-transformer-contentful-richtext`,
      options: {
        renderOptions: {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: node => {
              return `<img src="${node.data.target.fields.file['en-US'].url}" />`
            },
            [INLINES.ASSET_HYPERLINK]: node => {
              return `<img src="${node.data.target.fields.file['en-US'].url}" />`
            },
          },
        },
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
  ],
}
