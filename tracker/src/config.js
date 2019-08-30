const mixpanelToken = process.env.MIXPANEL_TOKEN
const production = process.env.NODE_ENV === 'production'
const rollbarToken = process.env.ROLLBAR_TOKEN

const location = {
  ...window.location,
}

export { location, mixpanelToken, production, rollbarToken }
