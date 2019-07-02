import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import FutureImg from '../images/future'
import Section from '../components/section'

const Future = styled(({ className }) => (
  <Section className={className}>
    <div className="future-img-container">
      <FutureImg />
    </div>
    <div>
      <div className="left-future-pad">
        <h3>{'Future of e-commerce'}</h3>
        <p className="h4">{'Next Generation Sales Channel.'}</p>
        <p className="h5">{'Learn how we turn Influencer Marketing into Influencer Sales.'}</p>
        <Button className="js-request-demo" color="#000">
          {'Read our magazine'}
        </Button>
      </div>
    </div>
  </Section>
))`
  flex-direction: column;
  @media (min-width: 900px) {
    flex-direction: row-reverse;
  }

  & > div {
    flex: 1;
  }

  .left-future-pad {
    padding-left: 4vw;
    padding-right 4vw;
    padding-top: 4vw;
    padding-bottom: 4vw;
  }

  @media (min-width: 900px) {
    .left-future-pad {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .h4 {
    width: 100%;
    font-size: 4vw;
    font-weight: bold;
    line-height: 1.25;
    margin-bottom: 1.5vh;
  }

  .h5 {
    font-size: 2.1vw;
    line-height: 1.25;
  }

  .future-img-container {
    align-self: flex-end;
    width: 100vw;
  }
  @media (min-width: 900px) {
    width: auto;
  }

  @media (max-width: 899px) {
    h3 {
      font-size: 4vw;
      line-height: 5vw;
    }

    .h4 {
      font-size: 8vw;
    }

    .h5 {
      font-size: 5vw;
    }

    button {
      width: 100%;
      font-size: 5vw;
      padding: 10px;
    }
  }
`

export default Future
