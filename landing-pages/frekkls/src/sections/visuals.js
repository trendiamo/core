import React from 'react'
import styled from 'styled-components'

import FakeChatJJImg from '../images/fake-chat-jj'
import FakePostImg from '../images/fake-post'
import FakeStoreImg from '../images/fake-store'
import Section from '../components/section'

const Visuals = styled(({ className }) => (
  <Section className={className} id="product">
    <div className="visuals-container">
      <FakePostImg className="fake-post-img" />
      <FakeStoreImg className="fake-store-img" />
      <FakeChatJJImg className="fake-chat-jj-img" />
    </div>
  </Section>
))`
  background: #fafafa;
  @media (min-width: 900px) {
    background: linear-gradient(to right, #fafafa 0%, #fafafa 50%, #fff 50%, #fff 100%);
  }

  .visuals-container {
    flex: 1;
    width: 100vw;
    position: relative;
    padding-top: 12vw;
    padding-bottom: 6vw;
    padding-right: 21px;
    padding-left: 21px;
  }

  @media (min-width: 900px) {
    .visuals-container {
      width: 60vw;
      padding-right: 0;
      padding-left: 0;
    }
  }

  @media (min-width: 900px) {
    .fake-post-img.gatsby-image-wrapper {
      z-index: 1;
      position: absolute !important;
      top: 6vw;
      left: -10vw;
      width: 28vw;
      box-shadow: 0 0 9px 2px rgba(0, 0, 0, 0.3);
    }
  }

  @media (min-width: 900px) {
    .fake-chat-jj-img.gatsby-image-wrapper {
      position: absolute !important;
      bottom: 2vw;
      right: -6vw;
      width: 16vw;
    }
  }

  @media (max-width: 899px) {
    .fake-store-img {
      width: 300%;
      margin-left: -170%;
    }
  }
`

export default Visuals
