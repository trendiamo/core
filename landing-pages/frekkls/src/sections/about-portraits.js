import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const Portrait = styled.div`
  float: left;
  width: 50%;
  padding: 6px;
  height: 560px;

  img {
    width: 100%;
    object-fit: contain;
    border-radius: 100%;
  }

  h3 {
    text-align: center;
    padding-top: 20px;
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  h4 {
    margin-bottom: 20px;
    font-size: 0.9em;
    color: #ff6e5d;
  }

  p {
    text-align: left;
    font-size: 0.8em;
  }

  @media (min-width: 900px) {
    width: 25%;
    padding: 20px;
    height: 600px;

    p {
      font-size: 1em;
    }
  }
`

const AboutPortraits = ({ className, aboutPortraits, teamMembers }) => (
  <Section className={className}>
    <Container>
      <h3>{aboutPortraits.teamSectionHeading}</h3>
      {teamMembers.edges.map(e => (
        <Portrait key={e.node.id}>
          <img alt="" src={e.node.profilePicture.fixed.src} />
          <h3>{e.node.profileName}</h3>
          <h4>{e.node.jobTitle}</h4>
          <p>{e.node.profileDescription}</p>
        </Portrait>
      ))}
    </Container>
  </Section>
)

export default AboutPortraits
