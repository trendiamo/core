import App from 'app'
import { h, render } from 'preact'

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
trendiamoContainer.style = { bottom: '10px', position: 'fixed', right: '10px', zIndex: '9001' }
document.body.appendChild(trendiamoContainer)

render(<App />, trendiamoContainer)
