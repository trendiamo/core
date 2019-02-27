import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

import orangeArrow from '../images/orange-arrow.svg'

const OrangeArrow = styled.img.attrs({
  src: orangeArrow,
})`
  &:hover {
    cursor: pointer;
  }
`

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 26px;
  }
  p {
    font-size: 19px;
    color: rgba(0, 0, 0, 0.7);
  }
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 900px) {
    width: 900px;
  }
`

const JobCardsContainer = styled.div`
  margin: 0px 0px 20px 0px;
`

const JobCard = styled.a`
  text-decoration: none;
  margin: 30px 0px;
  width: 100%;
  height: 114px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.14);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  h3 {
    font-size: 22px;
    margin: 10px 30px 10px 10px;
    color: rgba(0, 0, 0, 0.9);
  }

  h4 {
    font-size: 18px;
    margin-left: 10px;
    color: rgba(0, 0, 0, 0.7);
  }

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 900px) {
    width: 838px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 26px;
      margin-top: 0px;
      margin-bottom: 0px;
      margin-left: 40px;
    }
    h4 {
      font-size: 20px;
    }
  }
`

const JobCardDetailsLarge = styled.div`
  width: 100px;
  display: none;
  justify-content: space-between;
  margin-right: 40px;

  @media (min-width: 900px) {
    display: flex;
  }
`

const LocationSmall = styled.h4`
  color: rgba(0, 0, 0, 0.7);

  @media (min-width: 900px) {
    display: none;
  }
`

const OrangeArrowSmall = styled(OrangeArrow)`
  align-self: flex-end;
  margin-right: 10px;
  position: absolute;
  right: 1px;

  @media (min-width: 900px) {
    display: none;
  }
`

const JobsFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin-bottom: 40px;
  }
`

const AboutJobs = ({ aboutJobs, jobOpenings, layout }) => (
  <StyledSection>
    <StyledContainer>
      <div>
        <h3>{aboutJobs.jobSectionHeading}</h3>
        <p>{aboutJobs.jobSectionMainText.jobSectionMainText}</p>
      </div>
      <JobCardsContainer>
        {jobOpenings.edges.map(job => (
          <JobCard href={job.node.jobLink} key={job.node.id}>
            <h3>{`${job.node.title} (${job.node.jobType})`}</h3>
            <JobCardDetailsLarge>
              <h4>{'Lisbon'}</h4>
              <OrangeArrow />
            </JobCardDetailsLarge>
            <LocationSmall>{'Lisbon'}</LocationSmall>
            <OrangeArrowSmall />
          </JobCard>
        ))}
      </JobCardsContainer>
      <JobsFooter>
        <h3>{aboutJobs.jobSectionSubHeading}</h3>
        <p>{aboutJobs.jobSectionSubText.jobSectionSubText}</p>
        <div
          className="email-input email-input-2"
          data-email-label={layout.buzzEmailLabel}
          data-submit-text={layout.buzzEmailCta}
        />
      </JobsFooter>
    </StyledContainer>
  </StyledSection>
)

export default AboutJobs
