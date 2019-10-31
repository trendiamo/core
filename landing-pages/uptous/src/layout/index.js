import '../css/index.css'
import 'typeface-lato'
import 'typeface-nunito-sans'

import Helmet from 'react-helmet'
import React from 'react'
import styled from 'styled-components'

import CookieConsent from './cookie-consent'
import favicon from '../images/favicon.png'
import Footer from './footer'
import Header from './header'
import ModalContents from './modal-contents'
import Seo from './seo'

const Main = styled.main`
  /* make it so footer is always at bottom */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const headerLinks = [{ target: '/for-impacters', text: 'Why uptous' }, { target: '/pledge', text: 'Pledge' }]

const Layout = ({ children, data, light, whiteLogo }) => (
  <Main>
    <Seo />
    <Helmet>
      <link href={favicon} rel="shortcut icon" type="image/png" />
      <meta name="hbspt-locale" value="en" />
    </Helmet>
    {!light && <Header headerLinks={headerLinks} whiteLogo={whiteLogo} />}
    {children}
    {!light && <Footer />}
    {data && <ModalContents data={data} />}
    <CookieConsent />
  </Main>
)

export default Layout
