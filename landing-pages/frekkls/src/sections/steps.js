import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'
import Step01 from '../images/step-01'
import Step02 from '../images/step-02'
import Step03 from '../images/step-03'
import StepArrow from '../images/step-arrow.svg'

const Steps = styled.div`
  text-align: left;
  @media (min-width: 900px) {
    display: flex;
  }
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 40px 30px;
  color: #4a4a4a;
  display: flex;
  align-items: center;
  position: relative;

  @media (min-width: 900px) {
    margin-bottom: 0;
    margin-left: 14px;
    margin-right: 14px;
    flex: 1;

    & + &::after {
      content: '';
      position: absolute;
      top: 30%;
      left: -38px;
      width: 52px;
      height: 29px;
      background-image: url('${StepArrow}');
    }
  }

  h3 {
    margin-top: 2rem;
    font-size: 32px;
    color: #191919;
    width: 100%;
  }

  p {
    flex: 1;
    line-height: 1.5;
    font-size: 16px;
    margin: 0;
  }
`

const StepsContent = ({ steps }) => (
  <Steps>
    <Step>
      <Step01 alt="" />
      <h3>{steps.step1Title}</h3>
      <div dangerouslySetInnerHTML={{ __html: steps.step1Text.childMarkdownRemark.html }} />
    </Step>
    <Step>
      <Step02 alt="" />
      <h3>{steps.step2Title}</h3>
      <div dangerouslySetInnerHTML={{ __html: steps.step2Text.childMarkdownRemark.html }} />
    </Step>
    <Step>
      <Step03 alt="" />
      <h3>{steps.step3Title}</h3>
      <div dangerouslySetInnerHTML={{ __html: steps.step3Text.childMarkdownRemark.html }} />
    </Step>
  </Steps>
)

const StepsSection = styled(({ className, steps }) => (
  <Section className={className}>
    <Container>
      <StepsContent steps={steps} />
    </Container>
  </Section>
))`
  a {
    color: #ff683f;
  }

  ${Step} div,
  ${Step} p {
    width: 100%;
  }
`

export default StepsSection
