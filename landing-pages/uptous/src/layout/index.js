import '../css/index.css'
import 'typeface-montserrat'
import 'typeface-roboto'

import Helmet from 'react-helmet'
import React from 'react'
import styled from 'styled-components'

import favicon from '../images/favicon.png'
import Footer from './footer'
import ModalContents from './modal-contents'
import Seo from './seo'

const Main = styled.main`
  /* enable perspective for parallax scrolling */
  perspective: 700px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

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
    {children}
    <Footer />
    <ModalContents data={data} />
  </Main>
)

export default Layout
