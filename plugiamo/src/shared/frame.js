import omit from 'lodash.omit'
import ReactDOM from 'preact-compat'
import { compose, lifecycle, withState } from 'recompose'
import { h } from 'preact'
import { StyleSheetManager } from 'styled-components'

const Frame = ({ children, iframeRef, isLoaded, setIframeRef, className, title, ...rest }) => (
  <iframe {...omit(rest, ['iframeRef'])} className={className} ref={setIframeRef} tabIndex="-1" title={title}>
    {iframeRef &&
      iframeRef.contentDocument &&
      iframeRef.contentDocument.body &&
      ReactDOM.createPortal(
        <StyleSheetManager target={iframeRef.contentDocument.head}>{isLoaded ? children : <div />}</StyleSheetManager>,
        iframeRef.contentDocument.body
      )}
  </iframe>
)

const style = `
*, *::before, *::after {
  box-sizing: border-box;
}
body, html {
  font-family: 'Roboto', sans-serif;
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
  withState('iframeRef', 'setIframeRef', null),
  withState('isLoaded', 'setIsLoaded', false),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { iframeRef, setIsLoaded } = this.props
      if (iframeRef && iframeRef !== prevProps.iframeRef) {
        const load = () => {
          loadCss(iframeRef.contentDocument.head, 'https://fonts.googleapis.com/css?family=Roboto:400,500,700')
          addCss(iframeRef.contentDocument.head, style)
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
