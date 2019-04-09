const graphQlUrl = process.env.GRAPHQL_URL || '/graphql'
const mixpanelToken = process.env.MIXPANEL_TOKEN
const rollbarToken = process.env.ROLLBAR_TOKEN
const production = process.env.NODE_ENV === 'production'
const MAIN_BREAKPOINT = 600 // in pixels. From this width up, we're in large screen mode. Up to this width we're in small (fullscreen mode)
const HEIGHT_BREAKPOINT = 300 // in pixels. From this height up, the plugin may be shown. Up to this height, the plugin is not shown.
const WIDTH = 360
const bigLauncherConfig = {
  size: 100,
  frameSize: 150,
  smallSize: 70,
  smallFrameSize: 100,
  elevationWhenActive: 25,
}

const smallLauncherConfig = {
  size: 70,
  frameSize: 100,
  smallSize: 70,
  smallFrameSize: 100,
  elevationWhenActive: 25,
}

const location = {
  ...window.location,
}

const overrideAccount =
  localStorage.getItem('trnd-plugin-override-account') || (production ? undefined : process.env.ACCOUNT)

// export as both a default object and indivudal items
export {
  graphQlUrl,
  location,
  mixpanelToken,
  overrideAccount,
  production,
  rollbarToken,
  MAIN_BREAKPOINT,
  HEIGHT_BREAKPOINT,
  WIDTH,
  bigLauncherConfig,
  smallLauncherConfig,
}
export default {
  graphQlUrl,
  location,
  mixpanelToken,
  overrideAccount,
  production,
  rollbarToken,
  MAIN_BREAKPOINT,
  HEIGHT_BREAKPOINT,
  WIDTH,
  bigLauncherConfig,
  smallLauncherConfig,
}
