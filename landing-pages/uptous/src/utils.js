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

const addScript = content => {
  const script = document.createElement('script')
  script.innerHTML = content
  document.head.appendChild(script)
}

const addNoScript = content => {
  const noscript = document.createElement('noscript')
  noscript.innerHTML = content
  document.body.appendChild(noscript)
}

const addGTM = () => {
  if (process.env.NODE_ENV !== 'production') return
  const id = 'GTM-NP2FFN5'
  addScript(oneLine`${generateGTM({ id })}`)
  addNoScript(oneLine`${generateGTMIframe({ id })}`)
}

export { openModal, addGTM }
