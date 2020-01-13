import React from 'react'
import ReactCookieConsent from 'react-cookie-consent'
import styled from 'styled-components'
import { oneLine, stripIndent } from 'common-tags'

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

const PrivacyPolicyLink = styled.a`
  color: white;
`

const buttonStyle = {
  background: 'rgba(255,255,255,0.3)',
  color: '#fff',
  fontSize: '14px',
  padding: '6px 1rem 3px',
  borderRadius: '2px',
  margin: '0 10px 10px',
  textTransform: 'uppercase',
  lineHeight: 1,
}

const cookieConsentStyle = {
  background: '#111',
  color: '#fff',
  fontSize: '14px',
  justifyContent: 'center',
  lineHeight: '1.3',
}

const CookieConsent = () => (
  <ReactCookieConsent buttonStyle={buttonStyle} buttonText="Accept" onAccept={onAcceptClick} style={cookieConsentStyle}>
    {'Our website uses cookies to enhance your experience. Learn more about our '}
    <PrivacyPolicyLink href="/privacy-policy">{'cookie policy'}</PrivacyPolicyLink>
    {''}
  </ReactCookieConsent>
)

export default CookieConsent
