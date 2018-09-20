export default {
  graphQlUrl: process.env.GRAPHQL_URL,
  mixpanelToken: process.env.MIXPANEL_TOKEN,
  production: process.env.NODE_ENV === 'production',
  width: 360,
}
