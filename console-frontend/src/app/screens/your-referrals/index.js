import auth from 'auth'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'

const MainCard = styled.div`
  align-self: center;
  max-width: 720px;
  background-color: #fff;
  color: #1b3b50;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
`
const CardContent = styled.div`
  padding: 3.75rem 3.75rem 1rem 3.75rem;
  display: flex;
  flex-direction: column;

  img {
    align-self: center;
    width: 90px;
    height: 90px;
    padding-bottom: 2rem;
  }

  h2 {
    margin: 0;
  }
`
const Callout = styled.div`
  background-color: #1b3b50;
  color: #fff;
  padding: 2rem 3.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  b {
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
`

const YourReferrals = () => {
  const appBarContent = useMemo(() => ({ title: 'Invite others to join you!' }), [])
  useAppBarContent(appBarContent)
  const referralCode = useMemo(() => auth.getUser().referralCode, [])

  return (
    <MainCard>
      <CardContent>
        <img alt="" src="/img/icons/marketing.svg" />
        <h2>{'Refer a friend and earn twice!'}</h2>
        <p>
          {
            'Changing the world for the better is hard to do alone. The more people spreading the word about impactful brands, the better! You can contribute by inviting your friends to also sign up to UPTOUS! Whenever someone that signed up with your referral code creates revenue for the first time, you will receive an additional 50€ in your next payout. Let’s make the world a better place together!'
          }
        </p>
      </CardContent>
      <Callout>
        <b>{'Your referral code'}</b>
        <div>{referralCode}</div>
      </Callout>
    </MainCard>
  )
}

export default YourReferrals
