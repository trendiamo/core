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
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.14);
  border-radius: 12px;
  padding-bottom: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  h2 {
    font-size: 22px;
    margin: 10px 10px 10px 10px;
    color: rgba(0, 0, 0, 0.9);
  }

  h3 {
    font-size: 18px;
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
    height: 114px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0px;

    h2 {
      font-size: 26px;
      margin-top: 0px;
      margin-bottom: 0px;
      margin-left: 40px;
    }
    h3 {
      font-size: 22px;
      margin-top: 0px;
      margin-bottom: 0px;
      margin-left: 0px;
    }
    h4 {
      font-size: 20px;
    }
  }
`

const JobCardDetailsLargeContainer = styled.div`
  display: none;
  justify-content: flex-end;
  flex: 1;

  @media (min-width: 900px) {
    display: flex;
  }
`

const JobCardDetailsLarge = styled.div`
  display: none;
  margin-right: 40px;
  width: 100px;

  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
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
  <StyledSection id="jobs">
    <StyledContainer>
      <div>
        <h3>{aboutJobs.jobSectionHeading}</h3>
        <p>{aboutJobs.jobSectionMainText.jobSectionMainText}</p>
      </div>
      <JobCardsContainer>
        {jobOpenings.edges.map(job => (
          <div itemScope itemType="http://schema.org/JobPosting" key={job.node.id}>
            <JobCard href={job.node.jobLink} itemProp="url">
              <h2 itemProp="title">{`${job.node.title}`}</h2>
              <h3 itemProp="employmentType">{`(${job.node.jobType})`}</h3>
              <JobCardDetailsLargeContainer>
                <JobCardDetailsLarge>
                  <h4 itemProp="jobLocation">{'Lisbon'}</h4>
                  <OrangeArrow />
                </JobCardDetailsLarge>
              </JobCardDetailsLargeContainer>
              <LocationSmall itemProp="jobLocation">{'Lisbon'}</LocationSmall>
              <OrangeArrowSmall />
            </JobCard>
          </div>
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
