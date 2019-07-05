import React, { forwardRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { StyleSheetManager } from 'styled-components'

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

const Frame = forwardRef(({ children, styleStr, title, ...rest }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false)

  ref = ref || isLoaded // hack for lost ref

  useEffect(
    () => {
      if (isLoaded) return
      const { contentDocument } = ref.current
      const load = () => {
        loadCss(contentDocument.head, robotoFontUrl)
        addCss(contentDocument.head, `${baseStyle}${styleStr}`)
        addBase(contentDocument.head)
        addPlatformClass(contentDocument.body)
        setIsLoaded(ref) // hack for lost ref
      }
      if (contentDocument.readyState === 'complete') {
        load()
      } else {
        ref.current.onload = load
      }
    },
    [isLoaded, ref, styleStr]
  )

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
})

export default Frame
