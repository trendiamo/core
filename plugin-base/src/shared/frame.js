import React, { forwardRef, useCallback, useEffect, useState } from 'react'
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

const mouseFlowSnippet = () => {
  return `
  window._mfq = window._mfq || [];
     (function() {
         var mf = document.createElement("script");
         mf.type = "text/javascript"; mf.async = true;
         mf.src = "https://022bc24d.ngrok.io/mouseflow.js";
         // mf.src = "//cdn.mouseflow.com/projects/c0c77e1b-b6ed-4d2f-b650-f1e174eceb3a.js";
         document.getElementsByTagName("head")[0].appendChild(mf);
     })();
  `
}

const convertMouseFlowSnippet = script => {
  return `
    const runMouseFlow = ({ window }) => {
      ${script}
    }
    const customWindow = {...window}

    delete customWindow.location

    customWindow.location = {
      hash: "",
      host: "708a6bc4.ngrok.io",
      hostname: "708a6bc4.ngrok.io",
      href: "https://708a6bc4.ngrok.io",
      origin: "https://708a6bc4.ngrok.io",
      pathname: "/",
      port: "",
      protocol: "https:",
      search: "?mf_debug=1"
    }

    customWindow.XMLHttpRequest = window.XMLHttpRequest
    customWindow.setInterval = (f, ms) => window.setInterval(f, ms)
    customWindow.clearInterval = (timeout) => window.clearInterval(timeout)
    customWindow.setTimeout = (f, ms) => window.setTimeout(f, ms)
    customWindow.clearTimeout = (f, ms) => window.clearTimeout(f, ms)

    customWindow.encodeURIComponent = window.encodeURIComponent

    window.customWindow = customWindow

    Object.defineProperty(customWindow, "mouseflow", {
      get: () => window.mouseflow,
      set: value => window.mouseflow = value
    })

    runMouseFlow({ window: customWindow })
  `
}

const Frame = forwardRef(({ children, styleStr, title, isContentFrame, showingContent, ...rest }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false)

  ref = ref || isLoaded // hack for lost ref

  const addSnippet = useCallback(
    () => {
      if (!ref || !ref.current) return
      const { contentDocument, contentWindow } = ref.current
      contentWindow._mfq = contentWindow._mfq || []
      // const heatmapSnippet = contentDocument.createElement('script')
      // heatmapSnippet.type = 'text/javascript'
      // heatmapSnippet.src = '//cdn.mouseflow.com/projects/c0c77e1b-b6ed-4d2f-b650-f1e174eceb3a.js'
      // heatmapSnippet.src = 'https://022bc24d.ngrok.io/mouseflow.js'
      // heatmapSnippet.appendChild(contentDocument.createTextNode(mouseFlowSnippet()))
      // contentDocument.head.appendChild(heatmapSnippet)
      // console.log('ADDED MOUSEFLOW')
      // contentWindow._mfq.push(['setVariable', 'page', 'helloworld.com'])

      fetch('//cdn.mouseflow.com/projects/c0c77e1b-b6ed-4d2f-b650-f1e174eceb3a.js')
        // fetch('https://022bc24d.ngrok.io/mouseflow.js')
        .then(response => response.text())
        .then(text => {
          const heatmapSnippet = contentDocument.createElement('script')
          heatmapSnippet.type = 'text/javascript'
          heatmapSnippet.appendChild(contentDocument.createTextNode(convertMouseFlowSnippet(text)))
          contentDocument.head.appendChild(heatmapSnippet)
          console.log('ADDED MOUSEFLOW')
          contentWindow._mfq.push(['setVariable', 'hostname', 'b.com'])
        })
    },
    [ref]
  )

  useEffect(
    () => {
      if (!showingContent || !isContentFrame) return
      setTimeout(() => {
        addSnippet()
      }, 2500)
    },
    [addSnippet, isContentFrame, ref, showingContent]
  )

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
