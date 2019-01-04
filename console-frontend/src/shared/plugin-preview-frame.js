import omit from 'lodash.omit'
import React from 'react'
import ReactDOM from 'react-dom'
import { compose, lifecycle, withProps, withState } from 'recompose'
import { StyleSheetManager } from 'styled-components'

const PluginPreviewFrame = ({ children, iframeRef, isLoaded, title, ...rest }) => (
  <iframe {...omit(rest, ['setIsLoaded'])} ref={iframeRef} tabIndex="-1" title={title}>
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

export default compose(
  withProps({ iframeRef: React.createRef() }),
  withState('isLoaded', 'setIsLoaded', false),
  lifecycle({
    componentDidUpdate() {
      const { iframeRef, isLoaded, setIsLoaded } = this.props
      if (iframeRef && iframeRef.current && !isLoaded) {
        const load = () => {
          loadCss(iframeRef.current.contentDocument.head, 'https://fonts.googleapis.com/css?family=Roboto:400,500,700')
          addCss(iframeRef.current.contentDocument.head, style)
          setIsLoaded(true)
        }
        if (iframeRef.current.contentDocument.readyState === 'complete') {
          load()
        } else {
          iframeRef.current.onload = load
        }
      }
    },
  })
)(PluginPreviewFrame)
