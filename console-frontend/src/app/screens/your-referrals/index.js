import auth from 'auth'
import ClipboardInput from 'shared/clipboard-input'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import UserAvatar from 'shared/user-avatar'
import { apiMeReferrals, apiRequest } from 'utils'
import { Callout, CardContent, MainCard } from 'shared/uptous'
import { Paper } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`
const ReferralsList = styled.div`
  min-width: 300px;
`
const Referral = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  color: #8799a4;
`
const ReferralName = styled.div`
  flex: 1;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
`
const ReferralStatus = styled.div`
  color: #ffb400;
  text-transform: uppercase;
  font-size: 14px;
`

const YourReferrals = () => {
  const appBarContent = useMemo(() => ({ title: 'Invite others to join you!' }), [])
  useAppBarContent(appBarContent)
  const referralCode = useMemo(() => auth.getUser().referralCode, [])

  const [referrals, setReferrals] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiMeReferrals, [])
        if (requestError) {
          enqueueSnackbar(requestError, { variant: 'error' })
          return {}
        }
        setReferrals(json)
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <FlexContainer>
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
          <ClipboardInput text={referralCode} />
        </Callout>
      </MainCard>
      {referrals.length > 0 && (
        <ReferralsList>
          <h2>{'Your Referrals'}</h2>
          {referrals.map(referral => (
            <Referral key={referral.id}>
              <UserAvatar user={referral} />
              <ReferralName>{`${referral.firstName} ${referral.lastName}`}</ReferralName>
              <ReferralStatus>{'pending'}</ReferralStatus>
            </Referral>
          ))}
        </ReferralsList>
      )}
    </FlexContainer>
  )
}

export default YourReferrals
