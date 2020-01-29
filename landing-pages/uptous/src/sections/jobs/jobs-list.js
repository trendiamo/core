import Button from '../../components/button'
import Collapsible from '../../components/collapsible'
import React, { useCallback, useEffect, useState } from 'react'
import Section from '../../components/section'
import styled from 'styled-components'
import { pushToGA } from '../../utils'

const Container = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 120px;
`

const HeaderText = styled.div`
  color: #111;
  font-weight: 900;
  font-size: 26px;
  text-align: center;
  line-height: 1.36;

  @media (min-width: 1000px) {
    font-size: 36px;
    text-align: center;
  }
  margin-bottom: 70px;
`

const JobDescription = styled.p`
  font-size: 18px;
  text-align: left;
  line-height: 1.36;

  @media (min-width: 1000px) {
    font-size: 22px;
  }
`

const JobTypes = styled.div`
  color: #bbb;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: left;

  @media (min-width: 1000px) {
    font-size: 22px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Link = styled.a`
  display: block;
  appearance: none;
  text-decoration: none;
  outline: none;
  width: 100%;
`

const CollapsibleJob = ({ data, job }) => {
  const [openByDefault, setOpenByDefault] = useState(false)

  const onJoinTeamClick = useCallback(() => {
    pushToGA({
      event: 'buttonClick',
      eventCategory: 'CTAs',
      eventAction: 'Button Click',
      eventLabel: 'Apply for this job: ' + job.name,
    })
  }, [job.name])

  useEffect(() => {
    if (job.id === 'c1' || `#job-${job.id}` === window.location.hash) {
      setTimeout(() => setOpenByDefault(true), 100)
    }
  }, [job, job.id])

  return (
    <Collapsible heading={job.name} headingHook={`job-${job.id}`} key={job.id} openByDefault={openByDefault}>
      <ContentContainer>
        <JobDescription dangerouslySetInnerHTML={{ __html: job.description }}></JobDescription>
        <JobTypes>{`${data.jobs.value.jobTypes}: ${job.jobTypes}`}</JobTypes>
        <Link href="mailto:hello@uptous.co" onClick={onJoinTeamClick}>
          <Button size="big">{data.jobs.value.applyForThisJob}</Button>
        </Link>
      </ContentContainer>
    </Collapsible>
  )
}

const StrongVision = ({ data }) => {
  useEffect(() => {
    setTimeout(() => {
      const hash = window.location.hash
      window.location.hash = ''
      window.location.hash = hash
    }, 150)
  }, [])

  return (
    <Section>
      <Container>
        <HeaderText>{data.jobs.value.middleHeading2}</HeaderText>
        {data.jobs.value.jobs.map(job => (
          <CollapsibleJob data={data} job={job} key={job.id}></CollapsibleJob>
        ))}
      </Container>
    </Section>
  )
}

export default StrongVision
