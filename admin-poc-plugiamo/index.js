import App from './app'
import React from 'react'
import ReactDOM from 'react-dom'
// import Router from './app/router'
import { BrowserRouter as Router } from 'react-router-dom'

const RootContainer = document.getElementById('root')

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  RootContainer
)
