// TODO: this file is a copy of frame.js in plugin-base, with one difference: this Frame component manages its own ref.
// Having this duplicated file is a temporary hack, which only exists because we couldn't make the Assessment Store
// Modal work with the other component. This should be fixed asap.

import ReactDOM from 'preact/compat'
import { h } from 'preact'
import { StyleSheetManager } from 'styled-components'
import { useEffect, useRef, useState } from 'preact/hooks'

const robotoFontUrl = 'https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap'

const baseStyle = `
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

const Frame = ({ children, styleStr, title, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (isLoaded) return
    const { contentDocument } = ref.current
    const load = () => {
      loadCss(contentDocument.head, robotoFontUrl)
      addCss(contentDocument.head, `${baseStyle}${styleStr}`)
      addBase(contentDocument.head)
      addPlatformClass(contentDocument.body)
      setIsLoaded(true)
    }
    if (contentDocument.readyState === 'complete') {
      load()
    } else {
      ref.current.onload = load
    }
  }, [isLoaded, styleStr])

  return (
    <iframe {...rest} ref={ref} tabIndex="-1" title={title}>
      {isLoaded &&
        ref.current &&
        ref.current.contentDocument &&
        ReactDOM.createPortal(
          <StyleSheetManager target={ref.current.contentDocument.head}>{children}</StyleSheetManager>,
          ref.current.contentDocument.body
        )}
    </iframe>
  )
}

export default Frame
