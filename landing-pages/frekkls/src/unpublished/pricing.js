import React, { useState } from 'react'
import styled from 'styled-components'
import Switch from 'react-ios-switch'
import { graphql } from 'gatsby'

import Buzz from '../sections/buzz'
import Container from '../components/container'
import Layout from '../components/layout'
import Section from '../components/section'
import SocialProof from '../sections/social-proof'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 42px;
    font-weight: normal;
  }
`

const PricingCardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
  @media (min-width: 1000px) {
    flex-wrap: nowrap;
  }
`

const PricingCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 46px 0px;
  text-align: center;
  border-radius: 11px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
  width: 360px;

  h3 {
    font-size: 20px;
    font-weight: 500;
    color: #ff683f;
  }
  h1 {
    font-size: 72px;
    margin-bottom: 20px;
  }
  h4 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 40px;
  }
  ul {
    flex: 1;
    text-align: left;
  }
  li::before {
    content: '•';
    color: red;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
  li {
    padding: 8px 0px;
    color: #617283;
    font-size: 16px;
  }
`

const PriceContainer = styled.div`
  display: flex;

  p {
    align-self: flex-end;
  }
`

const PriceSwitchContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: 20px;

  p {
    margin-top: 5px;
    font-size: 16px;
    font-weight: bold;
  }
`

const PricingPage = ({ className, pageContext, data }) => {
  const [isPriceYearly, setIsPriceYearly] = useState(false)
  return (
    <Layout className={className} layout={data.layout} locale={pageContext.locale}>
      <Section>
        <StyledContainer>
          <h2>{data.pageContent.heading}</h2>
          <p>{data.pageContent.mainText}</p>
          <PriceSwitchContainer isPriceYearly={isPriceYearly}>
            <p>{'Monthly'}</p>
            <Switch
              checked={isPriceYearly}
              offColor="#ff683f"
              onChange={() => setIsPriceYearly(!isPriceYearly)}
              onColor="#ff683f"
              style={{ margin: '0px 20px' }}
            />
            <p>{'Yearly'}</p>
          </PriceSwitchContainer>
          <PricingCardsContainer>
            {data.pricePlans.edges.map(plan => (
              <PricingCard key={plan.node.id}>
                <h3>{plan.node.heading}</h3>
                <PriceContainer>
                  <h1>{isPriceYearly ? plan.node.yearlyPrice : plan.node.monthlyPrice}</h1>
                  <p>{isPriceYearly ? '/Yr' : '/m'}</p>
                </PriceContainer>
                <h4>{plan.node.subHeading}</h4>
                <ul>
                  {plan.node.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </PricingCard>
            ))}
          </PricingCardsContainer>
        </StyledContainer>
      </Section>
      <SocialProof clients={data.clients} testimonial={data.testimonial} />
      <Buzz layout={data.layout} />
    </Layout>
  )
}

export default PricingPage

export const query = graphql`
  query PricingPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    pageContent: contentfulPricingPage(node_locale: { eq: $locale }) {
      heading
      mainText
    }
    testimonial: contentfulTestimonial(author: { eq: "Victoria Schlüter" }, node_locale: { eq: $locale }) {
      author
      authorDescription
      text {
        text
      }
    }
    clients: allContentfulClient(sort: { fields: order }, filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          name
          logo {
            fluid(maxWidth: 160, toFormat: WEBP) {
              aspectRatio
              sizes
              src
              srcSet
            }
          }
        }
      }
    }
    pricePlans: allContentfulPricePlan(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          heading
          subHeading
          yearlyPrice
          monthlyPrice
          features
        }
      }
    }
  }
`
