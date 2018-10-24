const graphQlUrl = process.env.GRAPHQL_URL
const mixpanelToken = process.env.MIXPANEL_TOKEN
const production = process.env.NODE_ENV === 'production'
const width = 360
const location = {
  ...window.location,
}
if (process.env.HOSTNAME) location.hostname = process.env.HOSTNAME
if (process.env.PATHNAME) location.pathname = process.env.PATHNAME
if (process.env.SEARCH) location.search = process.env.SEARCH

// export as both a default object and indivudal items
export { graphQlUrl, location, mixpanelToken, production, width }
export default {
  graphQlUrl,
  location,
  mixpanelToken,
  production,
  width,
}
