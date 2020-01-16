import Container from '../components/container'
import image404 from '../images/404.png'
import Layout from '../layout'
import React from 'react'
import Section from '../components/section'
import Seo from '../layout/seo'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

const Content = styled.div``

const NotFoundPage = styled(({ className, data }) => (
  <Layout data={{ termsAndConditions: data.termsAndConditions.text, privacyPolicy: data.privacyPolicy.text }}>
    <Seo title="Uptous - 404 Not Found" />
    <Section className={className}>
      <Container>
        <Image src={image404} />
        <Content>
          <h1>{'Nothing seems to be at this URL'}</h1>
          <p>{"Sorry, the URL you entered doesn't have any results on this website!"}</p>
          <Link to="/">{'Go to Homepage'}</Link>
        </Content>
      </Container>
    </Section>
  </Layout>
))`
  flex: 1;
  ${Container} {
    min-height: 500px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
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
    margin-top: 60px;
  }
  h1 {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  a {
    display: block;
    color: white;
    padding: 12px;
    width: 220px;
    text-align: center;
    margin: 0 auto;
    background: black;
    text-decoration: none;
    font-size: 18px;
    font-weight: 700;
    border-radius: 3px;
  }
  p {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
  }

  @media (min-width: 1000px) {
    ${Container} {
      min-height: 700px;
    }
    h1 {
      font-size: 36px;
    }
    ${Content} {
      margin-top: 120px;
    }
  }
`

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
`

export const query = graphql`
  query NotFoundPage {
    termsAndConditions: contentfulModalText(name: { eq: "Terms and Conditions" }) {
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
  }
`

export default NotFoundPage
