import App from 'app'
import React from 'react'
import ReactDOM from 'react-dom'

const init = () => {
  const frkklsContainer = document.createElement('div')
  frkklsContainer.classList.add('frkkls-container')
  document.body.appendChild(frkklsContainer)
  ReactDOM.render(<App />, frkklsContainer)
}

init()
