import React from 'react'
import styled from 'styled-components'

import ArrowOrange from '../images/orange-arrow.svg'
import FakeChatWbImg from '../images/fake-chat-wb'
import Section from '../components/section'
import WhatLeftImg from '../images/what-left'
import WhatRightImg from '../images/what-right'

const What = styled(({ className }) => (
  <Section className={className} id="what-you-get">
    <h3>{'What you get'}</h3>
    <div className="what-content">
      <div clasName="what-social">
        <div className="what-img-container">
          <WhatLeftImg />
          <img alt="" className="what-arrow" src={ArrowOrange} />
        </div>
        <div className="what-text">
          <b className="social-headline">{'Social Salesforce'}</b>
          <p>
            {
              'Let over 100.000 influencers become your personal salesforce matched perfectly with your products and values on page. Take advantage of their reach and expertise and humanize your online sales in seconds with real people.'
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
          <b className="tool-headline">{'Sales Technology'}</b>
          <p>
            {
              'Integrate those people and their content with our smart tool directly into your shop and bridge seamlessly their social power with your shop checkouts to increase your conversions and sales for any kind of products and businesses.'
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

  .social-headline {
    color: #56aceb;
  }

  .tool-headline {
    color: #f7603d;
  }

  .what-text {
    padding: 1.8vw;
    flex: 1;
  }

  .what-text p {
    line-height: 1.5rem;
  }

  b {
    font-weight: 500;
    display: block;
    margin-bottom: 1rem;
    font-size: 1.8vw;
  }

  .what-img-container {
    align-self: flex-end;
    position: relative;
  }

  .what-arrow {
    position: absolute;
    top: 40%;
    right: -5%;
    width: 5%;
    max-width: 80px;
    z-index: 999;
  }

  .what-right-container {
    position: relative;
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

  @media (max-width: 900px) {
    h3 {
      font-size: 8vw;
    }

    .social-headline, .tool-headline {
      font-size: 8vw;
      margin-top: 10px;
    }
  }
`

export default What
