import Hello from './hello'
import Home from './home'
import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
// import * as auth0 from 'auth0-js'

// var authClient = new auth0.WebAuth({
//   domain: "trendiamotest.eu.auth0.com",
//   clientID: "hYoRAaXXYH4megwBFLbpgxPvndVPEnkI",
// });

const App = () => (
  <Router>
    <div>
      <Route component={Home} exac path="/" />
      <Route component={Hello} path="/hello" />
    </div>
  </Router>
)

export default App
