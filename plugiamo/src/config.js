const graphQlUrl = process.env.GRAPHQL_URL || '/graphql'
const mixpanelToken = process.env.MIXPANEL_TOKEN
const rollbarToken = process.env.ROLLBAR_TOKEN
const GApropertyId = process.env.GA_PROPERTY_ID
const GOcontainerId = process.env.GO_CONTAINER_ID
const GOexperimentId = process.env.GO_EXPERIMENT_ID
const production = process.env.NODE_ENV === 'production'
const MAIN_BREAKPOINT = 600 // in pixels. From this width up, we're in large screen mode. Up to this width we're in small (fullscreen mode)
const HEIGHT_BREAKPOINT = 300 // in pixels. From this height up, the plugin may be shown. Up to this height, the plugin is not shown.
const WIDTH = 360
const bigLauncherConfig = {
  size: 100,
  frameSize: 150,
  smallSize: 70,
  smallFrameSize: 100,
}

const smallLauncherConfig = {
  size: 70,
  frameSize: 100,
  smallSize: 70,
  smallFrameSize: 100,
}

const location = {
  ...window.location,
}

const assessmentHostname = production ? location.hostname : process.env.ASSESSMENT

const overrideAccount =
  localStorage.getItem('trnd-plugin-override-account') || (production ? undefined : process.env.ACCOUNT)

// export as both a default object and indivudal items
export {
  assessmentHostname,
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
  GApropertyId,
  GOcontainerId,
  GOexperimentId,
}
export default {
  assessmentHostname,
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
  GApropertyId,
  GOcontainerId,
  GOexperimentId,
}
