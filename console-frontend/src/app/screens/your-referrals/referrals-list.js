import Paper from 'shared/paper'
import React from 'react'
import styled from 'styled-components'
import UserAvatar from 'shared/user-avatar'
import { Typography } from '@material-ui/core'

const List = styled.div`
  margin-top: 20px;
  width: 100%;

  @media (min-width: 960px) {
    min-width: 300px;
    padding-bottom: 40px;
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

const ReferralUser = styled.div`
  display: flex;
  align-items: center;
`

const StyledUserAvatar = styled(UserAvatar)`
  margin-right: 10px;
`

const ReferralStatus = styled(({ className, state }) => <div className={className}>{state}</div>)`
  color: ${({ state }) => (state === 'approved' ? '#18e0aa' : '#ffb400')};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 900;
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

const ReferralsList = ({ referrals }) => (
  <List>
    <Typography variant="h5">{'Your Referrals'}</Typography>
    {referrals.map(referral => (
      <ReferralItem key={referral.user.id} referral={referral} />
    ))}
  </List>
)

export default ReferralsList
