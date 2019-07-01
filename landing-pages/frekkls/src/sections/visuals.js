import React from 'react'
import styled from 'styled-components'

import FakeChatJJImg from '../images/fake-chat-jj'
import FakePostImg from '../images/fake-post'
import FakeStoreImg from '../images/fake-store'
import Section from '../components/section'

const Visuals = styled(({ className }) => (
  <Section className={className}>
    <div className="visuals-container">
      <FakeStoreImg />
      <FakePostImg className="fake-post-img" />
      <FakeChatJJImg className="fake-chat-jj-img" />
    </div>
  </Section>
))`
  background: linear-gradient(to right, #fafafa 0%, #fafafa 50%, #fff 50%, #fff 100%);

  .visuals-container {
    flex: 1;
    width: 60vw;
    position: relative;
    padding-top: 12vw;
    padding-bottom: 6vw;
  }

  .fake-post-img.gatsby-image-wrapper {
    position: absolute !important;
    top: 6vw;
    left: -10vw;
    width: 28vw;
    box-shadow: 0 0 9px 2px rgba(0, 0, 0, 0.3);
  }

  .fake-chat-jj-img.gatsby-image-wrapper {
    position: absolute !important;
    bottom: 2vw;
    right: -6vw;
    width: 16vw;
  }
`

export default Visuals
