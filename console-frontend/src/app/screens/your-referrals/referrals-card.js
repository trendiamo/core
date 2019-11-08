import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import React, { useCallback } from 'react'
import SharingButtons from './sharing-buttons'
import styled from 'styled-components'
import { Callout, CalloutTitle, CardContent, MainCard } from 'shared/uptous'
import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg'
import { Typography } from '@material-ui/core'

const StyledChatIcon = styled(ChatIcon)`
  align-self: center;
  width: 80px;
  margin-bottom: 10px;

  @media (min-width: 960px) {
    width: 100px;
    margin-bottom: 30px;
  }
`

const ReferralsCardContent = () => (
  <CardContent>
    <StyledChatIcon />
    <Typography variant="h4">{'Invite your friends to become #impacters!'}</Typography>
    <Typography variant="body2">
      {
        'Changing the world for the better is hard to do alone. The more people spreading the word about impactful brands, the better! You can contribute by inviting your friends to also sign up to UPTOUS! Whenever someone that signed up with your referral code creates revenue for the first time, you will receive '
      }
      <strong>{'25 Impact Points!'}</strong>
    </Typography>
  </CardContent>
)

const StyledClipboardInput = styled(ClipboardInput)`
  width: 100%
  margin: 12px auto 0;
  height: 60px;

  @media (min-width: 960px) {
    width: 60%;
    margin-top: 0;
  }
  input {
    letter-spacing: 4px;
    font-weight: 700;
  }
`

const ReferralsCallout = ({ onCopyReferralsCode, referralCode }) => (
  <Callout>
    <CalloutTitle>{'Your Referral Code'}</CalloutTitle>
    <StyledClipboardInput backgroundColor="#e7ecef" onCopy={onCopyReferralsCode} text={referralCode} />
    <SharingButtons referralCode={referralCode} />
  </Callout>
)

const ReferralsCard = ({ referralCode }) => {
  const onCopyReferralsCode = useCallback(text => {
    mixpanel.track('Copied Referrals Code', { hostname: window.location.hostname, text })
  }, [])

  return (
    <MainCard>
      <ReferralsCardContent />
      <ReferralsCallout onCopyReferralsCode={onCopyReferralsCode} referralCode={referralCode} />
    </MainCard>
  )
}

export default ReferralsCard
