import omit from 'lodash.omit'
import ReactDOM from 'preact-compat'
import { compose, lifecycle, withProps, withState } from 'recompose'
import { h } from 'preact'
import { StyleSheetManager } from 'styled-components'

const Frame = ({ children, iframeHead, iframeBody, setIframeRef, className, title, ...rest }) => (
  <iframe {...omit(rest, ['iframeRef'])} className={className} ref={setIframeRef} tabIndex="-1" title={title}>
    {iframeBody &&
      ReactDOM.createPortal(<StyleSheetManager target={iframeHead}>{children}</StyleSheetManager>, iframeBody)}
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
  withProps(({ iframeRef }) => ({
    iframeBody: iframeRef && iframeRef.contentDocument.body,
    iframeHead: iframeRef && iframeRef.contentDocument.head,
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { iframeRef } = this.props
      if (iframeRef && iframeRef !== prevProps.iframeRef) {
        loadCss(iframeRef.contentDocument.head, 'https://fonts.googleapis.com/css?family=Roboto:400,500,700')
        addCss(iframeRef.contentDocument.head, style)
      }
    },
  })
)(Frame)
