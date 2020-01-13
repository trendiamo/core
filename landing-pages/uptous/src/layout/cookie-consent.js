import React from 'react'
import ReactCookieConsent from 'react-cookie-consent'
import styled from 'styled-components'

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
  <ReactCookieConsent buttonStyle={buttonStyle} buttonText="Accept" style={cookieConsentStyle}>
    {'Our website uses cookies to enhance your experience. Learn more about our '}
    <PrivacyPolicyLink href="/privacy-policy">{'cookie policy'}</PrivacyPolicyLink>
    {''}
  </ReactCookieConsent>
)

export default CookieConsent
