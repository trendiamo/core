import App from 'app'
import createHistory from 'history/createBrowserHistory'
import React from 'react'
import ReactDOM from 'react-dom'
import TagManager from 'react-gtm-module'

const gtmId = window.location.hostname.match(/uptous\.co$/)
  ? process.env.REACT_APP_UPTOUS_GTM
  : process.env.REACT_APP_FREKKLS_GTM
if (gtmId) TagManager.initialize({ gtmId })

const history = createHistory()

ReactDOM.render(
  <>
    <App history={history} />
  </>,
  document.getElementById('root')
)
