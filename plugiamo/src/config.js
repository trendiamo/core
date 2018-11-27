const graphQlUrl = process.env.GRAPHQL_URL
const isGraphCMS = graphQlUrl.includes('graphcms.com')
const mixpanelToken = process.env.MIXPANEL_TOKEN
const rollbarToken = process.env.ROLLBAR_TOKEN
const production = process.env.NODE_ENV === 'production'
const MAIN_BREAKPOINT = 600 // in pixels. From this width up, we're in large screen mode. Up to this width we're in small (fullscreen mode)
const HEIGHT_BREAKPOINT = 300 // in pixels. From this height up, the plugin may be shown. Up to this height, the plugin is not shown.
const WIDTH = 360
const location = {
  ...window.location,
}
if (!production && process.env.HOSTNAME) location.hostname = process.env.HOSTNAME

// export as both a default object and indivudal items
export {
  isGraphCMS,
  graphQlUrl,
  location,
  mixpanelToken,
  production,
  rollbarToken,
  MAIN_BREAKPOINT,
  HEIGHT_BREAKPOINT,
  WIDTH,
}
export default {
  isGraphCMS,
  graphQlUrl,
  location,
  mixpanelToken,
  production,
  rollbarToken,
  MAIN_BREAKPOINT,
  HEIGHT_BREAKPOINT,
  WIDTH,
}
