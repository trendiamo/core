import React from 'react'
import styled from 'styled-components'

import Section from '../components/section'
import StakeholderLogos from '../components/stakeholder-logos'
import { SmallContainer } from '../components/container'

const StyledSmallContainer = styled(SmallContainer)`
  font-size: 18px;
`

const StyledDiv = styled.div`
  padding-bottom: 18px;
  font-size: 26px;
`

const StyledSection = styled(Section)`
  background-color: #f2f4f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h5 {
    color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  p {
    font-size: 18px;
    font-style: italic;
  }
  @media (min-width: 900px) {
    font-size: 1em;
  }
`

const AboutInvestors = ({ aboutInvestors, investors }) => (
  <StyledSection>
    <h5>{aboutInvestors.investorSectionHeading}</h5>
    <StyledDiv>
      <h4>{aboutInvestors.investorSectionSubHeading}</h4>
    </StyledDiv>
    <StyledSmallContainer>
      <p>{aboutInvestors.investerSectionText.investerSectionText}</p>
    </StyledSmallContainer>
    <StakeholderLogos stakeholders={investors} />
  </StyledSection>
)

export default AboutInvestors
