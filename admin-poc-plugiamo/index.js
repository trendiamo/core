import App from './app'
import React from 'react'
import ReactDOM from 'react-dom'

const RootContainer = document.getElementById('root')

const RootComponent = () => <App />

ReactDOM.render(<RootComponent />, RootContainer)
