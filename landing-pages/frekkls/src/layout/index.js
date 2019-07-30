import '../css/index.css'
import 'typeface-roboto'
import 'typeface-roboto-slab'

import Helmet from 'react-helmet'
import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

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

const Layout = ({ blogCategories, children, className, hasGetStarted, headerColorScheme, headerLinks, layout }) => (
  <Main className={className}>
    <Seo />
    <Helmet>
      <link href={favicon} rel="shortcut icon" type="image/png" />
      <meta name="hbspt-locale" value="en" />
    </Helmet>
    <Header hasGetStarted={hasGetStarted} headerColorScheme={headerColorScheme} headerLinks={headerLinks} />
    <MainContent>
      {children}
      <Footer blogCategories={blogCategories} />
      {layout && <ModalContents layout={layout} />}
    </MainContent>
  </Main>
)

export const layoutFragment = graphql`
  fragment Layout on ContentfulLayout {
    legalNotice {
      childContentfulRichText {
        html
      }
    }
    privacyPolicy {
      childContentfulRichText {
        html
      }
    }
    requestDemo {
      childContentfulRichText {
        html
      }
    }
  }
`

export default Layout
