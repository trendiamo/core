import '../css/index.css'
import 'typeface-lato'
import 'typeface-nunito-sans'

import Helmet from 'react-helmet'
import React from 'react'
import styled from 'styled-components'

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

const Layout = ({ children, data }) => (
  <Main>
    <Seo />
    <Helmet>
      <link href={favicon} rel="shortcut icon" type="image/png" />
      <meta name="hbspt-locale" value="en" />
    </Helmet>
    <Header />
    {children}
    <Footer />
    <ModalContents data={data} />
  </Main>
)

export default Layout
