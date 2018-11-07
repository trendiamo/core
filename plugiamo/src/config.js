const graphQlUrl = process.env.GRAPHQL_URL
const mixpanelToken = process.env.MIXPANEL_TOKEN
const production = process.env.NODE_ENV === 'production'
const websocketUrl = process.env.WEBSOCKET_URL
const width = 360

// export as both a default object and indivudal items
export { graphQlUrl, mixpanelToken, production, websocketUrl, width }
export default {
  graphQlUrl,
  mixpanelToken,
  production,
  websocketUrl,
  width,
}
