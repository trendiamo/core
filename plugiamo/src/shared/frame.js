import omit from 'lodash.omit'
import ReactDOM from 'preact-compat'
import { compose, lifecycle, withState } from 'recompose'
import { emojifyStyles } from 'plugin-base'
import { h } from 'preact'
import { StyleSheetManager } from 'styled-components'

const Frame = ({ children, iframeRef, isLoaded, setIframeRef, title, ...rest }) => (
  <iframe {...omit(rest, ['setIsLoaded'])} ref={setIframeRef} tabIndex="-1" title={title}>
    {isLoaded &&
      iframeRef &&
      iframeRef.contentDocument &&
      iframeRef.contentDocument.body &&
      ReactDOM.createPortal(
        <StyleSheetManager target={iframeRef.contentDocument.head}>{children}</StyleSheetManager>,
        iframeRef.contentDocument.body
      )}
  </iframe>
)

const style = `
*, *::before, *::after {
  box-sizing: border-box;
}
body, html {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin: 0;
  height: 100%;
}
${emojifyStyles}
`

const loadCss = (head, href) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = href
  head.appendChild(link)
}

const addCss = (head, css) => {
  const element = document.createElement('style')
  element.setAttribute('type', 'text/css')
  if ('textContent' in element) {
    element.textContent = css
  } else {
    element.styleSheet.cssText = css
  }
  head.appendChild(element)
}

// so that links open in parent by default
const addBase = head => {
  const element = document.createElement('base')
  element.setAttribute('target', '_parent')
  head.appendChild(element)
}

const addPlatformClass = body => {
  const platformClass = encodeURIComponent(navigator.platform).replace(/%[0-9A-F]{2}/gi, '-')
  body.classList.add(platformClass)
}

export default compose(
  withState('iframeRef', 'setIframeRef', null),
  withState('isLoaded', 'setIsLoaded', false),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { iframeRef, setIsLoaded } = this.props
      if (iframeRef && iframeRef !== prevProps.iframeRef) {
        const load = () => {
          // Here we avoid FOIT (Flash of Invisible Text) on the slow network connections. Read more: https://medium.com/@pierluc/enable-font-display-on-google-fonts-with-cloudflare-workers-d7604cb30eab
          fetch('https://fonts.googleapis.com/css?family=Roboto:400,500,700').then(response => {
            response.text().then(body => {
              addCss(iframeRef.contentDocument.head, body.replace(/}/g, 'font-display: swap; }'))
            })
          })
          addCss(iframeRef.contentDocument.head, style)
          addBase(iframeRef.contentDocument.head)
          addPlatformClass(iframeRef.contentDocument.body)
          setIsLoaded(true)
        }
        if (iframeRef.contentDocument.readyState === 'complete') {
          load()
        } else {
          iframeRef.onload = load
        }
      }
    },
  })
)(Frame)
