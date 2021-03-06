import React from 'react'
import styled from 'styled-components'

import ArrowOrange from '../images/orange-arrow.svg'
import FakeChatWbImg from '../images/fake-chat-wb'
import Section from '../components/section'
import WhatLeftImg from '../images/what-left'
import WhatRightImg from '../images/what-right'

const What = styled(({ className }) => (
  <Section className={className} id="what-you-get">
    <h3 className="large-screen">{'What you get'}</h3>
    <div className="what-content">
      <div className="what-social">
        <div className="what-img-container">
          <WhatLeftImg />
          <img alt="" className="what-arrow" src={ArrowOrange} />
        </div>
        <div className="what-text">
          <h3 className="small-screen">{'What you get'}</h3>
          <b className="social-headline">{'Social Salesforce'}</b>
          <p>
            {
              'Let over 100.000 influencers become your personal salesforce, perfectly matched with your products and values of your brand. Get the most out of their reach and expertise and humanize your online sales in seconds with real people.'
            }
          </p>
        </div>
      </div>
      <div className="what-sales">
        <div className="what-right-container">
          <WhatRightImg />
          <FakeChatWbImg className="fake-chat-wb-img" />
        </div>
        <div className="what-text">
          <h3 className="small-screen">{'What you get'}</h3>
          <b className="tool-headline">{'Sales Technology'}</b>
          <p>
            {
              'Integrate sellers and their content directly into your webshop with our smart and easy to use tool and seamlessly bridge their social traffic with your shop to boost your conversions and sales for any kind of products and businesses.'
            }
          </p>
        </div>
      </div>
    </div>
  </Section>
))`
  .what-content {
    flex: 1;
    flex-direction: column;
    width: 100vw;
    display: flex;
    align-items: stretch;
    background: #fafafa;
  }

  @media (min-width: 900px) {
    .what-content {
      flex-direction: row;
    }
  }

  .what-social,
  .what-sales {
    flex-basis: 50%;
  }

  .social-headline {
    color: black;
  }

  .tool-headline {
    color: black;
  }

  .what-text {
    padding: 40px;
    flex: 1;
  }

  .what-text p {
    line-height: 1.5;
  }

  h3.large-screen {
    display: none;
  }
  @media (min-width: 900px) {
    h3.large-screen {
      display: block;
    }
    h3.small-screen {
      display: none;
    }
  }

  b {
    font-weight: 500;
    display: block;
    margin-bottom: 1rem;
    font-size: 1.8vw;
  }

  .what-img-container,
  .what-right-container {
    position: relative;
  }

  .what-arrow {
    position: absolute;
    top: 40%;
    right: calc(-5% + 1px);
    width: 5%;
    max-width: 80px;
    z-index: 999;
  }

  .fake-chat-wb-img.gatsby-image-wrapper {
    position: absolute !important;
    bottom: 0;
    right: 0;
    width: 34vw;
  }

  @media (min-width: 900px) {
    .fake-chat-wb-img.gatsby-image-wrapper {
      width: 21vw;
    }
  }

  @media (max-width: 899px) {
    .social-headline,
    .tool-headline {
      font-size: 8vw;
      margin-top: 10px;
    }

    .what-text {
      padding: 4vw;
    }
  }
`

export default What
