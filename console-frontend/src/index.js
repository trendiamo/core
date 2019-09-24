import App from 'app'
import createHistory from 'history/createBrowserHistory'
import mixpanel from 'ext/mixpanel'
import React from 'react'
import ReactDOM from 'react-dom'
import TagManager from 'react-gtm-module'

const gtmId = window.location.hostname.match(/uptous\.co$/)
  ? process.env.REACT_APP_UPTOUS_GTM
  : process.env.REACT_APP_FREKKLS_GTM
if (gtmId) TagManager.initialize({ gtmId })

if (process.env.REACT_APP_MIXPANEL_TOKEN) mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN)

const history = createHistory()
history.listen(() => mixpanel.track('Visited Page', { hostname: window.location.hostname }))
mixpanel.track('Visited Page', { hostname: window.location.hostname })

ReactDOM.render(
  <>
    <App history={history} />
  </>,
  document.getElementById('root')
)
