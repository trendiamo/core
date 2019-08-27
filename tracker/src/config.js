const mixpanelToken = process.env.MIXPANEL_TOKEN
const production = process.env.NODE_ENV === 'production'

const location = {
  ...window.location,
}

export { location, mixpanelToken, production }
