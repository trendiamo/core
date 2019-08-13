import '../css/index.css'
import 'typeface-montserrat'

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
`

const Layout = ({ children, data }) => (
  <Main>
    <Seo />
    <Helmet>
      <link href={favicon} rel="shortcut icon" type="image/png" />
    </Helmet>
    {children}
    <Footer />
    <ModalContents data={data} />
  </Main>
)

export default Layout
