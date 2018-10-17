import App from './app'
import createHistory from 'history/createBrowserHistory'
import { HttpLink } from 'apollo-link-http'
import React from 'react'
import ReactDOM from 'react-dom'
import { setContext } from 'apollo-link-context'
// import * as serviceWorker from "./serviceWorker";

const history = createHistory()
const uriPlugAdmin = `https://${process.env.REACT_APP_API_ENDPOINT}/graphql`
const authLink1 = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'X-USER-EMAIL': localStorage.getItem('authEmail'),
    'X-USER-TOKEN': localStorage.getItem('authToken'),
  },
}))
const authLink = authLink1.concat(new HttpLink({ uri: uriPlugAdmin }))

ReactDOM.render(<App authLink={authLink} history={history} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
