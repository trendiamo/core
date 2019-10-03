import auth from 'auth'
import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import Paper from 'shared/paper'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import UserAvatar from 'shared/user-avatar'
import { apiMeReferrals, apiRequest } from 'utils'
import { Callout, CalloutTitle, CardContent, MainCard } from 'shared/uptous'
import { Grid, Typography } from '@material-ui/core'
import { ReactComponent as StartUpIcon } from 'assets/icons/start-up.svg'
import { useSnackbar } from 'notistack'

const ReferralsList = styled.div`
  margin-top: 20px;
  width: 100%;
  @media (min-width: 960px) {
    min-width: 300px;
    margin-top: 0;
  }
`

const FlexGrid = styled(Grid)`
  justify-content: center;
`

const StyledClipboardInput = styled(ClipboardInput)`
  width: 100%;
  margin-top: 12px;
  @media (min-width: 960px) {
    width: auto;
    margin-top: 0;
  }
  input {
    letter-spacing: 4px;
    font-weight: 700;
  }
`

const Referral = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 12px;
  margin-top: 12px;
`

const ReferralStatus = styled(({ className, state }) => <div className={className}>{state}</div>)`
  color: ${({ state }) => (state === 'approved' ? '#18e0aa' : '#ffb400')};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 900;
`

const StyledStartUpIcon = styled(StartUpIcon)`
  align-self: center;
  width: 45px;
  margin-bottom: 20px;
  @media (min-width: 960px) {
    margin-bottom: 40px;
    width: 62px;
  }
`

const ReferralUser = styled.div`
  display: flex;
  align-items: center;
`

const StyledUserAvatar = styled(UserAvatar)`
  margin-right: 10px;
`

const ReferralItem = ({ referral }) => (
  <Referral key={referral.user.id}>
    <ReferralUser>
      <StyledUserAvatar user={referral.user} />
      <Typography variant="body2">{`${referral.user.firstName} ${referral.user.lastName}`}</Typography>
    </ReferralUser>
    <ReferralStatus state={referral.state} />
  </Referral>
)

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

  const onCopyReferralCode = useCallback(text => {
    mixpanel.track('Copied Referral Code', { hostname: window.location.hostname, text })
  }, [])

  return (
    <FlexGrid container>
      <Grid item lg={5} md={7} xl={3} xs={12}>
        <MainCard>
          <CardContent>
            <StyledStartUpIcon />
            <Typography variant="h5">{'Refer a friend and earn twice!'}</Typography>
            <Typography variant="body2">
              {
                'Changing the world for the better is hard to do alone. The more people spreading the word about impactful brands, the better! You can contribute by inviting your friends to also sign up to UPTOUS! Whenever someone that signed up with your referral code creates revenue for the first time, you will receive an additional 10€ in your next payout. Let’s make the world a better place together!'
              }
            </Typography>
          </CardContent>
          <Callout>
            <CalloutTitle align="center" variant="h5">
              {'Your referral code'}
            </CalloutTitle>
            <StyledClipboardInput onCopy={onCopyReferralCode} text={referralCode} type="golden" />
          </Callout>
        </MainCard>
      </Grid>
      <Grid item lg={2} md={4} xl={2} xs={12}>
        {referrals.length > 0 && (
          <ReferralsList>
            <Typography variant="h5">{'Your Referrals'}</Typography>
            {referrals.map(referral => (
              <ReferralItem key={referral.user.id} referral={referral} />
            ))}
          </ReferralsList>
        )}
      </Grid>
    </FlexGrid>
  )
}

export default YourReferrals
