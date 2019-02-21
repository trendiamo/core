import Helmet from 'react-helmet'
import locales from '../../locales'
import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'

import Footer from './footer'
import Header from './header'
import ModalContents from './modal-contents'
import Seo from './seo'

import 'typeface-roboto'
import 'typeface-roboto-slab'

import '../css/index.css'
import 'tingle.js/dist/tingle.min.css'

import favicon from '../images/favicon.png'

const Main = styled.main`
  overflow: hidden;
`

const Layout = ({ children, className, layout, locale }) => (
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
        <Seo keywords={[]} lang={locale} meta={[]} title="Frekkls" />
        <Helmet>
          <link href={favicon} rel="shortcut icon" type="image/png" />
          <meta name="hbspt-locale" value={locales[locale].hbspt} />
        </Helmet>
        <Header layout={layout} locale={locale} siteTitle={data.site.siteMetadata.title} />
        {children}
        <Footer layout={layout} locale={locale} />
        <ModalContents layout={layout} />
      </Main>
    )}
  />
)

export const layoutFragment = graphql`
  fragment Layout on ContentfulLayout {
    about
    blog
    contactPrompt
    tryNow
    footerInfo
    demo2
    legal
    privacy
    outro
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
    buzzHeading
    buzzText
    buzzEmailLabel
    buzzEmailCta
  }
`

export default Layout
