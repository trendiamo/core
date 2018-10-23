import App from 'app'
import auth from 'app/auth'
import createHistory from 'history/createBrowserHistory'
import { fetchUtils } from 'react-admin'
import React from 'react'
import ReactDOM from 'react-dom'
import simpleRestProvider from 'ra-data-simple-rest'

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
const dataProvider = simpleRestProvider(`https://${process.env.REACT_APP_API_ENDPOINT}/api/v1`, httpClient)

ReactDOM.render(<App dataProvider={dataProvider} history={history} />, document.getElementById('root'))
