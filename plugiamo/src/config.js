const graphQlUrl = process.env.GRAPHQL_URL
const mixpanelToken = process.env.MIXPANEL_TOKEN
const production = process.env.NODE_ENV === 'production'
const MAIN_BREAKPOINT = 600 // in pixels. From this width up, we're in large screen mode. Up to this width we're in small (fullscreen mode)
const HEIGHT_BREAKPOINT = 300 // in pixels. From this height up, the plugin may be shown. Up to this height, the plugin is not shown.
const WIDTH = 360
const location = {
  ...window.location,
}
if (process.env.HOSTNAME) location.hostname = process.env.HOSTNAME
if (process.env.PATHNAME) location.pathname = process.env.PATHNAME
if (process.env.SEARCH) location.search = process.env.SEARCH

// export as both a default object and indivudal items
export { graphQlUrl, location, mixpanelToken, production, MAIN_BREAKPOINT, HEIGHT_BREAKPOINT, WIDTH }
export default {
  graphQlUrl,
  location,
  mixpanelToken,
  production,
  MAIN_BREAKPOINT,
  HEIGHT_BREAKPOINT,
  WIDTH,
}
