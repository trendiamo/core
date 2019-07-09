import '../css/index.css'
import 'typeface-roboto'
import 'typeface-roboto-slab'

import Helmet from 'react-helmet'
import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'

import Footer from './footer'
import Header from './header'
import ModalContents from './modal-contents'
import Seo from './seo'

import favicon from '../images/favicon.png'

const Main = styled.main`
  overflow: hidden;
  position: relative;
`

const MainContent = styled.div`
  ${Header}.fixed + & {
    padding-top: 120px;
  }

  body.mobile-menu-open & {
    position: relative;
    overflow: hidden;
    height: calc(100vh - 130px);
    min-height: calc(100vh - 130px);
    pointer-events: none;
  }
`

const Layout = ({ children, className, layout }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Main className={className}>
        <Seo />
        <Helmet>
          <link href={favicon} rel="shortcut icon" type="image/png" />
          <meta name="hbspt-locale" value="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <MainContent>
          {children}
          <Footer />
          {layout && <ModalContents layout={layout} />}
        </MainContent>
      </Main>
    )}
  />
)

export default Layout
