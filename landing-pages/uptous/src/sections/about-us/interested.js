import React, { useCallback } from 'react'
import Section from '../../components/section'
import styled from 'styled-components'
import { pushToGA } from '../../utils'

const HeaderText = styled.div`
  color: #111;
  font-weight: 900;
  font-size: 36px;
  text-align: center;
`

const Container = styled.div`
  width: 100%;
  margin: 20px 0;

  @media (min-width: 1000px) {
    margin: 100px 0 80px;
  }
`

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: block;

  @media (min-width: 1000px) {
    margin-top: 80px;
    display: flex;
    justify-content: space-around;
  }
`

const Button = styled.button`
  border: 1px solid #111;
  outline: none;
  background: #111;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 3px;

  width: 100%;
  padding: 8px 0;

  @media (min-width: 1000px) {
    padding: 8px 40px;
    width: auto;
  }
`

const Link = styled.a`
  display: block;
  appearance: none;
  margin-top: 20px;
  text-decoration: none;
  outline: none;
  @media (min-width: 1000px) {
    margin-top: 0px;
  }
`

const AboutUsHero = ({ data }) => {
  const onMemberClick = useCallback(() => {
    pushToGA({
      event: 'buttonClick',
      eventCategory: 'CTAs',
      eventAction: 'Button Click',
      eventLabel: 'I want to become a member',
    })
  }, [])

  const onJoinTeamClick = useCallback(() => {
    pushToGA({
      event: 'buttonClick',
      eventCategory: 'CTAs',
      eventAction: 'Button Click',
      eventLabel: 'I want to join the team',
    })
  }, [])

  return (
    <Section>
      <Container>
        <HeaderText>{data.aboutUs.bottomHeading}</HeaderText>
        <ButtonContainer>
          <Link href="https://uptous.co/magazine/newsletter-signup" onClick={onMemberClick}>
            <Button>{data.layout.value.buttons.becomeMember}</Button>
          </Link>
          <Link href="/jobs" onClick={onJoinTeamClick}>
            <Button>{data.layout.value.buttons.joinTeam}</Button>
          </Link>
        </ButtonContainer>
      </Container>
    </Section>
  )
}

export default AboutUsHero
