import React from 'react'
import styled from 'styled-components'

import FakeChatWbImg from '../images/fake-chat-wb'
import Section from '../components/section'
import WhatLeftImg from '../images/what-left'
import WhatRightImg from '../images/what-right'

const What = styled(({ className }) => (
  <Section className={className}>
    <h3>{'What you get'}</h3>
    <div className="what-content">
      <div className="what-img-container">
        <WhatLeftImg />
      </div>
      <div className="what-right-container">
        <WhatRightImg />
        <FakeChatWbImg className="fake-chat-wb-img" />
      </div>
    </div>
    <div className="what-content bg2">
      <div className="what-text">
        <b>{'Social Salesforce'}</b>
        <p>
          {
            'Let over 100.000 influencers become your personal salesforce matched perfectly with your products and values on page. Take advantage of their reach and expertise and humanize your online sales in seconds with real people.'
          }
        </p>
      </div>
      <div className="what-text">
        <b>{'Sales Technology'}</b>
        <p>
          {
            'Integrate those people and their content with our smart tool directly into your shop and bridge seamlessly their social power with your shop checkouts to increase your conversions and sales for any kind of products and businesses.'
          }
        </p>
      </div>
    </div>
  </Section>
))`
  .what-content {
    flex: 1;
    width: 100vw;
    display: flex;
    align-items: center;
    background: linear-gradient(to right, #f07643 0%, #f07643 50%, #fff 50%, #fff 100%);
  }

  .bg2 {
    background: #fafafa;
  }

  .what-text {
    padding: 1.8vw;
  }

  b {
    font-weight: 500;
    display: block;
    margin-bottom: 1rem;
    font-size: 1.8vw;
  }

  .what-content > div {
    flex: 1;
  }

  .what-img-container {
    align-self: flex-end;
  }

  .what-right-container {
    position: relative;
  }

  .fake-chat-wb-img.gatsby-image-wrapper {
    position: absolute !important;
    bottom: 0;
    right: 0;
    width: 30vw;
  }
`

export default What
