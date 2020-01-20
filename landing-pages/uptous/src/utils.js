import tingle from 'tingle.js'
import { oneLine, stripIndent } from 'common-tags'

const Modal = tingle.modal

const openModal = modalElementSelector => {
  const content = document.querySelector(modalElementSelector).innerHTML
  const modal = new Modal()
  modal.setContent(content)
  modal.open()
}

const generateGTM = ({ id }) => stripIndent`
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${id}');`

const generateGTMIframe = ({ id }) =>
  `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display: none; visibility: hidden"></iframe>`

const addGTMSnippet = (content, type, place) => {
  const script = document.createElement(type)
  script.innerHTML = content
  document[place].appendChild(script)
}

const getCookie = name => {
  let cookie = {}
  document.cookie.split(';').forEach(function(el) {
    let [k, v] = el.split('=')
    cookie[k.trim()] = v
  })
  return cookie[name]
}

const addGTM = () => {
  if (process.env.NODE_ENV !== 'production') return

  if (!getCookie('CookieConsent')) {
    return
  }
  if (window.ga) return

  const id = 'GTM-NP2FFN5'
  addGTMSnippet(oneLine`${generateGTM({ id })}`, 'script', 'head')
  addGTMSnippet(oneLine`${generateGTMIframe({ id })}`, 'noscript', 'body')
}

const pushToGA = object => {
  if (process.env.NODE_ENV !== 'production') {
    // It's important to be aware of how GA events are being fired in development environment.
    console.log('%cTracking to GA', 'color: #06b;', object)
    return
  }
  if (!window.dataLayer) return
  return window.dataLayer.push(object)
}

export { openModal, addGTM, pushToGA }
