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
  display: flex;
  min-height: 100vh;
  flex-direction: column;
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
