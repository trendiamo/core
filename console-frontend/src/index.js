import App from 'app'
import createHistory from 'history/createBrowserHistory'
import React from 'react'
import ReactDOM from 'react-dom'

const history = createHistory()

ReactDOM.render(
  <>
    <App history={history} />
  </>,
  document.getElementById('root')
)
