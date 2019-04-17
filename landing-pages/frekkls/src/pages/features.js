import React from 'react'
import { graphql } from 'gatsby'

import BridgeSlider from '../sections/bridge-slider'
import Buzz from '../sections/buzz'
import CustomerJourneySlider from '../sections/customer-journey-slider'
import Depth from '../sections/depth'
import FeaturesHero from '../sections/features-hero'
import FeaturesSlider from '../sections/features-slider'
import Layout from '../components/layout'
import Steps from '../sections/steps'

const FeaturesPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <FeaturesHero featuresHero={data.featuresHero} />
    <Steps steps={data.steps} />
    <FeaturesSlider featuresSlider={data.featuresSlider} featuresSliderContent={data.featuresSliderContent} />
    <CustomerJourneySlider
      customerJourneySlider={data.customerJourneySlider}
      customerJourneySliderContent={data.customerJourneySliderContent}
    />
    <BridgeSlider bridgeSlider={data.bridgeSlider} bridgeSliderContent={data.bridgeSliderContent} />
    <Depth depth={data.depth} />
    <Buzz layout={data.layout} />
  </Layout>
)

export default FeaturesPage

export const query = graphql`
  query FeaturesPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    featuresHero: contentfulFeaturesPage(name: { eq: "Features" }, node_locale: { eq: $locale }) {
      featuresHeroHeading
      featuresHeroSubHeading {
        featuresHeroSubHeading
      }
    }
    steps: contentfulFeaturesPage(name: { eq: "Features" }, node_locale: { eq: $locale }) {
      step1Title
      step2Title
      step3Title
      step1Text {
        childMarkdownRemark {
          html
        }
      }
      step2Text {
        childMarkdownRemark {
          html
        }
      }
      step3Text {
        childMarkdownRemark {
          html
        }
      }
    }
    depth: contentfulFeaturesPage(name: { eq: "Features" }, node_locale: { eq: $locale }) {
      feature1Heading
      feature1Text
      feature2Heading
      feature2Text
      feature3Heading
      feature3Text
    }
    featuresSlider: contentfulFeaturesPage(name: { eq: "Features" }, node_locale: { eq: $locale }) {
      featuresSliderHeading
    }
    featuresSliderContent: allContentfulFeaturesSlide(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          slideHeader
          slideText {
            slideText
          }
          slideImage {
            fixed(width: 700, toFormat: WEBP) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
    customerJourneySlider: contentfulFeaturesPage(node_locale: { eq: $locale }) {
      customerJourneySliderHeading
      customerJourneySliderSubHeading
    }
    customerJourneySliderContent: allContentfulFeaturesCustomerJourneySlide(
      sort: { fields: order }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          icon {
            file {
              url
            }
          }
          activeIcon {
            file {
              url
            }
          }
          heading
          subHeading
          mainText {
            mainText
          }
          image {
            fixed(width: 440) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
    bridgeSlider: contentfulFeaturesPage(node_locale: { eq: $locale }) {
      bridgeSliderHeading
      bridgeSliderSubHeading
    }
    bridgeSliderContent: allContentfulFeaturesBridgeSlide(
      sort: { fields: order }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          icon {
            file {
              url
            }
          }
          activeIcon {
            file {
              url
            }
          }
          heading
          subHeading
          mainText {
            mainText
          }
          image {
            fixed {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
