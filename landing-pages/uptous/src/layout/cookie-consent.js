import React from 'react'
import ReactCookieConsent from 'react-cookie-consent'
import styled from 'styled-components'
import { oneLine, stripIndent } from 'common-tags'

import { openModal } from '../utils'

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

const onAcceptClick = () => {
  if (process.env.NODE_ENV !== 'production') return
  const id = 'GTM-NP2FFN5'
  addScript(oneLine`${generateGTM({ id })}`)
  addNoScript(oneLine`${generateGTMIframe({ id })}`)
}

const onPrivacyPolicyClick = event => {
  event.preventDefault()
  openModal('.privacy-policy-modal-content')
}

const PrivacyPolicyLink = styled.a`
  color: white;
`

const buttonStyle = {
  background: 'white',
  color: '#272a32',
  fontSize: '20px',
  fontWeight: '900',
  padding: '5px 1rem',
  textTransform: 'uppercase',
}

const cookieConsentStyle = {
  background: '#1d1f25',
  color: 'white',
}

const CookieConsent = () => (
  <ReactCookieConsent buttonStyle={buttonStyle} buttonText="Agree" onAccept={onAcceptClick} style={cookieConsentStyle}>
    {'This website uses cookies to enhance the user experience ('}
    <PrivacyPolicyLink href="#privacy-policy" onClick={onPrivacyPolicyClick}>
      {'learn more'}
    </PrivacyPolicyLink>
    {')'}
  </ReactCookieConsent>
)

export default CookieConsent
