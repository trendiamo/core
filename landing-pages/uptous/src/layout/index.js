import CookieConsent from './cookie-consent'
import favicon from '../images/favicon.png'
import Footer from './footer'
import Header from './header'
import Helmet from 'react-helmet'
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
  // The HTTP Links should stay this way because magazine is currently a separate server!
  { target: 'https://uptous.co/magazine/newsletter-signup/', name: 'joinCommunity' },
  { target: '/about-us', name: 'aboutUs' },
  { target: 'https://uptous.co/magazine', name: 'magazine' },
]

const Layout = ({ children, light, hideNewsletter, highlightUrl, data }) => {
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
      {!light && <Header data={data} headerLinks={headerLinks} highlightUrl={highlightUrl} />}
      {children}
      {!light && <Footer data={data} hideNewsletter={hideNewsletter} />}
      <CookieConsent data={data} />
    </Main>
  )
}

export default Layout
