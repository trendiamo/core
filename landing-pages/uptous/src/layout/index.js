import '../css/index.css'
import 'typeface-lato'
import 'typeface-nunito-sans'

import Helmet from 'react-helmet'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import CookieConsent from './cookie-consent'
import favicon from '../images/favicon.png'
import Footer from './footer'
import Header from './header'
import ModalContents from './modal-contents'
import Seo from './seo'
import { addGTM } from '../utils'

const Main = styled.main`
  /* make it so footer is always at bottom */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const headerLinks = [
  { target: '/magazine/newsletter-signup/', text: 'Join Community' },
  { target: '/about-us', text: 'About us' },
  { target: '/magazine', text: 'Magazine' },
]

const Layout = ({ children, data, light }) => {
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
      {!light && <Footer />}
      {data && <ModalContents data={data} />}
      <CookieConsent />
    </Main>
  )
}

export default Layout
