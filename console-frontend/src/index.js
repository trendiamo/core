import App from 'app'
import auth from 'app/auth'
import createHistory from 'history/createBrowserHistory'
import { HttpLink } from 'apollo-link-http'
import React from 'react'
import ReactDOM from 'react-dom'
import { setContext } from 'apollo-link-context'
// import * as serviceWorker from "./serviceWorker";

const history = createHistory()
const authLink1 = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    ...auth.getHeaders(),
  },
}))
const authLink = authLink1.concat(new HttpLink({ uri: '/graphql' }))

ReactDOM.render(<App authLink={authLink} history={history} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
