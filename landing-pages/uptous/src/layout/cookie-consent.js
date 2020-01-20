import React, { useCallback } from 'react'
import ReactCookieConsent from 'react-cookie-consent'
import styled from 'styled-components'
import { addGTM } from '../utils'

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

const CookieConsent = () => {
  const onAccept = useCallback(() => {
    // It's here because we want to accept cookie consent on our magazine website.
    // Don't remove it unless you have a strong reason to do so (i.e: if the magazine doesn't exist anymore, or other).
    const expirationDays = 30
    const cookieExpireDate = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * expirationDays).toGMTString()
    document.cookie = `ruby_cookie_popup=1; expires=${cookieExpireDate}; path=/;`
    setTimeout(addGTM, 100)
  }, [])

  return (
    <ReactCookieConsent buttonStyle={buttonStyle} buttonText="Accept" onAccept={onAccept} style={cookieConsentStyle}>
      {'Our website uses cookies to enhance your experience. Learn more about our '}
      <PrivacyPolicyLink href="/privacy-policy">{'cookie policy'}</PrivacyPolicyLink>
      {''}
    </ReactCookieConsent>
  )
}

export default CookieConsent
