// reimplement react-snapshot's render method to make sure to output styles, and keep font loading async
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS as scSecrets } from 'styled-components'

const { StyleSheet } = scSecrets
const $$ = (selector, fn) => Array.prototype.forEach.call(document.querySelectorAll.bind(document)(selector), fn)

const render = (rootComponent, domElement) => {
  if (navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender) {
    StyleSheet.reset(false)
    domElement.innerHTML = ReactDOMServer.renderToString(rootComponent)
    $$('style[data-styled-components]', node => node.parentNode.removeChild(node))
    document.head.innerHTML += StyleSheet.instance.toHTML()
    $$('link[rel="stylesheet"]', node => node.parentNode.removeChild(node))
    window.reactSnapshotRender()
  } else {
    ReactDOM.render(rootComponent, domElement)
  }
}

export { render }
