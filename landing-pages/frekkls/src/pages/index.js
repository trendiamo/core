import React from 'react'
import { graphql } from 'gatsby'

import Buzz from '../sections/buzz'
import Depth from '../sections/depth'
import Nads from '../sections/nads'

import DiscoverProduct from '../sections/discover-product'
import Hero from '../sections/hero'
import Layout from '../components/layout'
import LevelUpSlider from '../sections/level-up-slider'
import RecentBlog from '../sections/recent-blog'
import SocialProof from '../sections/social-proof'

const IndexPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <Hero hero={data.hero} />
    <SocialProof clients={data.clients} testimonial={data.testimonial} />
    <DiscoverProduct discoverProductsSliderContent={data.discoverProductsSliderContent} />
    <LevelUpSlider levelUp={data.levelUp} levelUpSliderContent={data.levelUpSliderContent} />
    <Nads ads={data.ads} locale={pageContext.locale} />
    <Depth depth={data.depth} />
    <RecentBlog blogPost={data.recentBlogs.edges[0].node} locale={pageContext.locale} />
    <Buzz layout={data.layout} />
  </Layout>
)

export default IndexPage

export const query = graphql`
  query Homepage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    hero: contentfulHomepage(name: { eq: "Homepage-v2" }, node_locale: { eq: $locale }) {
      openerHeading
      openerSubHeading
      openerEmailLabel
      openerEmailCta
      openerImage {
        fluid(maxWidth: 1200, toFormat: WEBP) {
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    }
    clients: allContentfulClient(sort: { fields: order }, filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          name
          logo {
            fixed(width: 160, toFormat: WEBP) {
              src
            }
          }
        }
      }
    }
    testimonial: contentfulTestimonial(author: { eq: "Victoria Schlüter" }, node_locale: { eq: $locale }) {
      author
      authorDescription
      text {
        text
      }
    }
    discoverProductsSliderContent: allContentfulDiscoverProductSlide(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          slideMainText
          slideSecondaryText {
            slideSecondaryText
          }
          slideImage {
            fixed(width: 350) {
              src
              width
              height
              srcSet
            }
          }
        }
      }
    }
    ads: contentfulHomepage(name: { eq: "Homepage-v2" }, node_locale: { eq: $locale }) {
      adsHeading
      adsSubHeading
      adsText {
        adsText
      }
      adsCta
    }
    depth: contentfulHomepage(name: { eq: "Homepage-v2" }, node_locale: { eq: $locale }) {
      feature1Heading
      feature1Text
      feature2Heading
      feature2Text
      feature3Heading
      feature3Text
    }
    recentBlogs: allContentfulBlogPost(
      limit: 1
      sort: { fields: publishingDate }
      filter: { node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          title
          description {
            description
          }
          slug
          titleImage {
            fixed(width: 1280) {
              src
            }
          }
          cardCta
        }
      }
    }
    levelUp: contentfulHomepage(name: { eq: "Homepage-v2" }, node_locale: { eq: $locale }) {
      levelUpHeading
      levelUpSubHeading
    }
    levelUpSliderContent: allContentfulLevelUpSlide(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          slideHeading
          slideName
          slideText {
            slideText
          }
          slideImage {
            fixed(width: 605, toFormat: WEBP) {
              src
            }
          }
          slideCta
        }
      }
    }
  }
`
