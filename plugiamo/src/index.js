import App from 'app'
import { h, render } from 'preact'

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)

render(<App />, trendiamoContainer)
