import CookieConsent from './cookie-consent'
import favicon from '../images/favicon.png'
import Footer from './footer'
import Header from './header'
import Helmet from 'react-helmet'
import ModalContents from './modal-contents'
import React, { useEffect } from 'react'
import Seo from './seo'
import styled from 'styled-components'
import { addGTM } from '../utils'
import '../css/index.css'
import 'typeface-lato'
import 'typeface-nunito-sans'

const Main = styled.main`
  /* make it so footer is always at bottom */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const headerLinks = [
  { target: 'https://magazine.uptous.co/newsletter-signup/', text: 'Join Community' },
  { target: '/about-us', text: 'About us' },
  { target: 'https://magazine.uptous.co', text: 'Magazine' },
]

const Layout = ({ children, data, light, hideNewsletter }) => {
  useEffect(() => {
    addGTM()
  }, [])

  return (
    <Main>
      <Seo />
      <Helmet>
        <link href={favicon} rel="shortcut icon" type="image/png" />
        <meta name="hbspt-locale" value="en" />
      </Helmet>
      {!light && <Header headerLinks={headerLinks} />}
      {children}
      {!light && <Footer hideNewsletter={hideNewsletter} />}
      {data && <ModalContents data={data} />}
      <CookieConsent />
    </Main>
  )
}

export default Layout
