import Button from 'shared/button'
import Link from 'shared/link'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Email } from '@material-ui/icons'
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg'
import { ReactComponent as MessengerIcon } from 'assets/icons/messenger.svg'
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg'
import { Typography } from '@material-ui/core'
import { ReactComponent as WhatsAppIcon } from 'assets/icons/whatsapp.svg'

const linkBase = `${window.location.origin}/signup`

const StyledButton = styled(Button)`
  min-width: 0;
  padding: 6px 14px;
  margin: 5px;

  svg {
    width: 20px;
    height: 20px;
    fill: #0f7173;
  }
  &:hover svg {
    fill: #fff;
  }
`

const StyledLink = styled(Link)`
  width: 100%;
`

const MainContainer = styled.div`
  margin-top: 25px;
`

const SharingButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px -5px -5px;
`

const SharingButton = ({ title, Icon, link }) => (
  <StyledLink aria-label={title} href={link}>
    <StyledButton color="whiteBg" fullWidth size="small">
      <Icon />
      {title}
    </StyledButton>
  </StyledLink>
)

const dataFactory = ({ referralCode }) => ({
  email: {
    subject: 'Hi, I think you might be interested in joining UPTOUS!',
    body: `Hi,

I think you might be interested in joining UPTOUS! It is a network where you can earn money by sharing and promoting sustainable brands.
You can check it out and signup now at this link:

${linkBase}?aftk=${referralCode}`,
  },
  whatsappAndTwitter: `Hi, I think you might be interested in joining UPTOUS! It is a network where you can earn money by sharing and promoting sustainable brands. You can check it out and signup now at this link: ${linkBase}?aftk=${referralCode}`,
  facebookAndMessenger: `${linkBase}?aftk=${referralCode}`,
})

const SharingButtons = ({ referralCode }) => {
  const data = useMemo(() => {
    return dataFactory({ referralCode })
  }, [referralCode])

  return (
    <MainContainer>
      <Typography align="center" variant="h5">
        {'Share on'}
      </Typography>
      <SharingButtonsContainer>
        <SharingButton
          Icon={FacebookIcon}
          link={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.facebookAndMessenger)}`}
        />
        <SharingButton
          Icon={MessengerIcon}
          link={`fb-messenger://share/?link=${encodeURIComponent(data.facebookAndMessenger)}`}
        />
        <SharingButton
          Icon={WhatsAppIcon}
          link={`whatsapp://send?text=${encodeURIComponent(data.whatsappAndTwitter)}`}
        />
        <SharingButton
          Icon={TwitterIcon}
          link={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(data.whatsappAndTwitter)}`}
        />
        <SharingButton
          Icon={Email}
          link={`mailto:?subject=${encodeURIComponent(data.email.subject)}&body=${encodeURIComponent(data.email.body)}`}
        />
      </SharingButtonsContainer>
    </MainContainer>
  )
}

export default SharingButtons
