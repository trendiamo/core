/* eslint-disable no-undef */
const { BLOCKS, INLINES } = require('@contentful/rich-text-types')

require('dotenv').config()
const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
}
const { spaceId, accessToken } = contentfulConfig
if (!spaceId || !accessToken) {
  throw new Error('Contentful spaceId and the delivery token need to be provided.')
}

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-react-svg',
    },
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: '@contentful/gatsby-transformer-contentful-richtext',
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
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
}
/* eslint-enable no-undef */
