import App from './app'
import authFactory from './app/auth'
import React from 'react'
import ReactDOM from 'react-dom'

const RootContainer = document.getElementById('root')

const RootComponent = () => <App />

const auth = authFactory()

ReactDOM.render(<RootComponent auth={auth} />, RootContainer)
