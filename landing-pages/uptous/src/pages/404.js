import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Container from '../components/container'
import Layout from '../layout'
import MagnifyingGlass from '../images/magnifying-glass.svg'
import Section from '../components/section'
import Seo from '../layout/seo'

const Content = styled.div``

const NotFoundPage = styled(({ className, data }) => (
  <Layout
    data={{
      legalNotice: data.legalNotice.text,
      privacyPolicy: data.privacyPolicy.text,
      brandFormIntro: data.brandFormIntro.text,
      influencerFormIntro: data.influencerFormIntro.text,
      getInTouchFormIntro: data.getInTouchFormIntro.text,
    }}
  >
    <Seo title="Uptous - 404 Not Found" />
    <Section className={className}>
      <Container>
        <MagnifyingGlass />
        <Content>
          <h1>{'Oops!'}</h1>
          <p>{"We couldn't find the page you were looking for!"}</p>
          <Link to="/">{'‹ Back home'}</Link>
        </Content>
      </Container>
    </Section>
  </Layout>
))`
  flex: 1;
  ${Container} {
    min-height: 500px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  svg {
    max-width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  ${Content} {
    z-index: 1;
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    color: #12e5c4;
  }
  a {
    color: #12e5c4;
  }
`

export const query = graphql`
  query NotFoundPage {
    legalNotice: contentfulModalText(name: { eq: "Legal Notice" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    privacyPolicy: contentfulModalText(name: { eq: "Privacy Policy" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    brandFormIntro: contentfulModalText(name: { eq: "Brand Form Intro" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    influencerFormIntro: contentfulModalText(name: { eq: "Influencer Form Intro" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    getInTouchFormIntro: contentfulModalText(name: { eq: "Get In Touch Form Intro" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
  }
`

export default NotFoundPage