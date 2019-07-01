/* eslint-disable no-undef */
require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'Frekkls',
    description: '',
    author: '@trendiamo',
  },
  plugins: [
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
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-MDGF2B3',
        includeInDevelopment: false,
      },
    },
  ],
}
/* eslint-enable no-undef */
