import omit from 'lodash.omit'
import React from 'react'
import ReactDOM from 'react-dom'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { StyleSheetManager } from 'styled-components'

const Iframe = ({ className, children, iframeRef, isLoaded, hidden, title, ...rest }) => (
  <iframe
    className={className}
    {...omit(rest, ['load', 'setIsLoaded'])}
    hidden={hidden}
    ref={iframeRef}
    tabIndex="-1"
    title={title}
  >
    {isLoaded &&
      iframeRef &&
      iframeRef.current &&
      iframeRef.current.contentDocument &&
      iframeRef.current.contentDocument.body &&
      ReactDOM.createPortal(
        <StyleSheetManager target={iframeRef.current.contentDocument.head}>{children}</StyleSheetManager>,
        iframeRef.current.contentDocument.body
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

const ComposedIframe = compose(
  withState('isLoaded', 'setIsLoaded', false),
  withHandlers({
    load: ({ iframeRef, setIsLoaded }) => () => {
      const { body, head } = iframeRef.current.contentDocument
      loadCss(head, 'https://fonts.googleapis.com/css?family=Roboto:400,500,700')
      addCss(head, style)
      addBase(head)
      addPlatformClass(body)
      setIsLoaded(true)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { iframeRef, load } = this.props
      if (iframeRef.current.contentDocument.readyState === 'complete') {
        load()
      } else {
        iframeRef.current.onload = load
      }
    },
  })
)(Iframe)

export default React.forwardRef((props, iframeRef) => <ComposedIframe iframeRef={iframeRef} {...props} />)
