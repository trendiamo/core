import createHistory from 'history/createBrowserHistory'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'app'

const history = createHistory()

ReactDOM.render(
  <React.Fragment>
    <App history={history} />
  </React.Fragment>,
  document.getElementById('root')
)
