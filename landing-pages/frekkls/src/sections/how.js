import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import HowImg from '../images/how'
import Section from '../components/section'

const How = styled(({ className }) => (
  <Section className={className}>
    <div className="how-img-container">
      <HowImg />
    </div>
    <div>
      <div className="right-how-pad">
        <h3>{'How it works'}</h3>
        <p className="h4">{'A seamless shopping experience starts here.'}</p>
        <p className="h5">{'Provide an inspiring user journey from the website entry all the way to the checkout.'}</p>
        <Button className="js-request-demo" color="#000">
          {'Learn more'}
        </Button>
      </div>
    </div>
  </Section>
))`
  flex-direction: row;
  background: linear-gradient(to right, #fdbcd0 0%, #fdbcd0 50%, #fff 50%, #fff 100%);

  & > div {
    flex: 1;
  }

  .how-image-container {
    align-self: flex-end;
  }

  .right-how-pad {
    padding-right: 4vw;
    padding-left: 4vw;
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
`

export default How
