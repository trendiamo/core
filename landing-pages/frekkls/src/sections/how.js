import React, { useCallback } from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import HowImg from '../images/how'
import Section from '../components/section'

const How = styled(({ className }) => {
  const onCtaButtonClick = useCallback(() => {
    window.frekklsOpenDemoModal()
  }, [])

  return (
    <Section className={className}>
      <div className="how-img-container">
        <HowImg />
      </div>
      <div>
        <div className="right-how-pad">
          <h3>{'How it works'}</h3>
          <p className="h4">{'A seamless shopping experience starts here.'}</p>
          <p className="h5">
            {'Provide an inspiring user journey from the website entry all the way to the checkout.'}
          </p>
          <Button big color="#000" onClick={onCtaButtonClick}>
            {'Learn more'}
          </Button>
        </div>
      </div>
    </Section>
  )
})`
  flex-direction: column;
  @media (min-width: 900px) {
    flex-direction: row;
  }

  & > div {
    flex: 1;
  }

  .how-img-container {
    align-self: flex-end;
    width: 100vw;
  }
  @media (min-width: 900px) {
    .how-img-container {
      width: auto;
      height: 100vh;

      & > div {
        height: 100%;
      }
    }
  }

  .right-how-pad {
    padding-right: 4vw;
    padding-left: 4vw;
    padding-top: 4vw;
    padding-bottom: 4vw;
  }
  @media (min-width: 900px) {
    .right-how-pad {
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

  @media (max-width: 899px) {
    .h4 {
      font-size: 6vw;
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

export default How
