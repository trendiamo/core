import App from 'app'
import createHistory from 'history/createBrowserHistory'
import React from 'react'
import ReactDOM from 'react-dom'

const history = createHistory()

ReactDOM.render(
  <React.Fragment>
    <App history={history} />
  </React.Fragment>,
  document.getElementById('root')
)
