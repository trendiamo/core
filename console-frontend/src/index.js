import App from 'app'
import auth from 'auth'
import createHistory from 'history/createBrowserHistory'
import React from 'react'
import ReactDOM from 'react-dom'
import simpleRestProvider from 'ra-data-simple-rest'
import { CustomApp } from 'app'
import { fetchUtils } from 'react-admin'

const history = createHistory()

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  Object.keys(auth.getHeaders()).forEach(key => {
    options.headers.set(key, auth.getHeaders()[key])
  })
  return fetchUtils.fetchJson(url, options)
}
const dataProvider = simpleRestProvider(`${process.env.REACT_APP_API_ENDPOINT || ''}/api/v1`, httpClient)

ReactDOM.render(
  <React.Fragment>
    <App dataProvider={dataProvider} history={history} />
    <CustomApp />
  </React.Fragment>,
  document.getElementById('root')
)
