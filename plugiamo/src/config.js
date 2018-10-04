const graphQlUrl = process.env.GRAPHQL_URL
const hostname = process.env.FORCED_HOST || location.hostname
const mixpanelToken = process.env.MIXPANEL_TOKEN
const production = process.env.NODE_ENV === 'production'
const width = 360

// export as both a default object and indivudal items

export { graphQlUrl, hostname, mixpanelToken, production, width }

export default {
  graphQlUrl,
  hostname,
  mixpanelToken,
  production,
  width,
}
