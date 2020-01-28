import React, { useCallback, useMemo } from 'react'
import ReactCookieConsent from 'react-cookie-consent'
import styled from 'styled-components'
import { addGTM } from '../utils'

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

const Text = styled.div`
  a {
    color: #fff;
  }
`

const cookieConsentStyle = {
  background: '#111',
  color: '#fff',
  fontSize: '14px',
  justifyContent: 'center',
  lineHeight: '1.3',
}

const CookieConsent = ({ data }) => {
  const onAccept = useCallback(() => {
    // It's here because we want to accept cookie consent on our magazine website.
    // Don't remove it unless you have a strong reason to do so (i.e: if the magazine doesn't exist anymore, or other).
    const expirationDays = 30
    const cookieExpireDate = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * expirationDays).toGMTString()
    document.cookie = `ruby_cookie_popup=1; expires=${cookieExpireDate}; path=/;`
    setTimeout(addGTM, 100)
  }, [])

  const consentContent = useMemo(
    () =>
      data.layout5.value.cookieBanner.text.replace(
        '[:cookiePolicy]',
        `<a href="/cookie-policy">${data.layout5.value.legalPageNames.cookiePolicy}</a>`
      ),
    [data.layout5.value.cookieBanner.text, data.layout5.value.legalPageNames.cookiePolicy]
  )

  return (
    <ReactCookieConsent
      buttonStyle={buttonStyle}
      buttonText={data.layout5.value.buttons.cookieBannerAccept}
      onAccept={onAccept}
      style={cookieConsentStyle}
    >
      <Text dangerouslySetInnerHTML={{ __html: consentContent }}></Text>
    </ReactCookieConsent>
  )
}

export default CookieConsent
