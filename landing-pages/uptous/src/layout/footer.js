import IconInstagram from '../images/icon-instagram.svg'
import IconLinkedin from '../images/icon-linkedin.svg'
import React, { useCallback, useMemo } from 'react'
import Section from '../components/section'
import styled from 'styled-components'
import { pushToGA } from '../utils'

const Header = styled.div`
  font-family: 'Avenir', sans-serif;
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: 900;
  white-space: nowrap;
  color: ${({ red }) => (red ? '#FF3955' : '#333')};
`

const NewsletterBannerContainer = styled.div``

const CopyrightText = styled.div``

const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0px;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 50px;

  @media (min-width: 1000px) {
    justify-content: center;
  }
`

const FooterLinksSection = styled.div``

const DarkSection = styled.div``

const GreySection = styled.div`
  background: #f5f5f5;
`

const Link = styled.a`
  font-size: 16px;

  padding: 0 5px;

  @media (min-width: 1000px) {
    padding: 0 26px;
    font-size: 20px;

    & + & {
      border-left: 2px solid #fff;
    }
  }
`

const SocialLink = styled.a`
  display: block;
  & + & {
    margin-left: 30px;
  }
`

const BannerButton = styled.input`
  appearance: none;
  border: 1px solid #111;
  outline: none;
  background: #111;
  color: #fff;
  font-size: 18px;
  padding: 8px 90px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 3px;
  width: 100%;

  @media (min-width: 1000px) {
    width: auto;
  }
`

const BannerInput = styled.input`
  font-family: 'Avenir', sans-serif;
  appearance: none;
  border: 1px solid #111;
  width: 100%;
  font-size: 18px;
  outline: none;
  padding: 10px;
  padding-top: 12px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border-radius: 0px;

  @media (min-width: 1000px) {
    width: 90%;
  }
`

const BannerButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`

const BannerFooterText = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 20px;

  a {
    padding: 0 5px;
    color: #111;
    font-weight: 900;
  }
`

const StayTunedText = styled.div`
  color: #111;
  margin-bottom: 15px;
`

const MailchimpForm = ({ data }) => {
  const onSubscribeClick = useCallback(() => {
    pushToGA({
      event: 'buttonClick',
      eventCategory: 'CTAs',
      eventAction: 'Button Click',
      eventLabel: 'Footer Sign me up',
    })
  }, [])

  const termsAndConditionsText = useMemo(
    () =>
      data.layout.value.texts.byClickingThisButton.replace(
        '[:termsAndConditions]',
        `<a href="/terms-and-conditions" >${data.layout.value.legalPageNames.termsAndConditions}</a>`
      ),
    [data.layout.value.legalPageNames.termsAndConditions, data.layout.value.texts.byClickingThisButton]
  )

  return (
    <form
      action="https://uptous.us4.list-manage.com/subscribe/post?u=45912ce59aa8ef47e7126f2fa&amp;id=33d3cabba0"
      method="post"
      name="mc-embedded-subscribe-form"
      noValidate
      target="_blank"
    >
      <BannerInput name="EMAIL" placeholder={data.layout.value.texts.emailInputPlaceholder} required type="email" />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
        <input defaultValue="" name="b_45912ce59aa8ef47e7126f2fa_33d3cabba0" tabIndex="-1" type="text" />
      </div>
      <BannerButtonContainer>
        <BannerButton
          name="subscribe"
          onClick={onSubscribeClick}
          type="submit"
          value={data.layout.value.buttons.signMeUp}
        />
      </BannerButtonContainer>
      <BannerFooterText dangerouslySetInnerHTML={{ __html: termsAndConditionsText }}></BannerFooterText>
    </form>
  )
}

const NewsletterBanner = ({ data }) => (
  <NewsletterBannerContainer>
    <StayTunedText>{data.layout.value.texts.stayTuned}</StayTunedText>
    <MailchimpForm data={data} />
  </NewsletterBannerContainer>
)

// The HTTP Links should stay this way because magazine is currently a separate server!
const FooterLinks = ({ data }) => (
  <FooterLinksContainer>
    <Link href="https://uptous.co/magazine">{data.layout.value.footer.magazine}</Link>
    <Link href="/terms-and-conditions">{data.layout.value.footer.termsAndConditions}</Link>
    <Link href="/jobs">{data.layout.value.footer.jobs}</Link>
    <Link href="/privacy-policy">{data.layout.value.legalPageNames.privacyPolicy}</Link>
    <Link href="/cookie-policy">{data.layout.value.legalPageNames.cookiePolicy}</Link>
  </FooterLinksContainer>
)

const SocialContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;

  @media (min-width: 1000px) {
    margin: 0;
    position: absolute;
    right: 10px;
  }
`

const DarkSectionFlex = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  margin-bottom: 10px;

  @media (min-width: 1000px) {
    justify-content: center;
    display: flex;
    max-width: 1160px;
    margin-bottom: 50px;
  }
`

const Social = () => (
  <SocialContainer>
    <SocialLink
      href="https://www.linkedin.com/company/uptous-positive-influence/"
      rel="noopener noreferrer"
      target="_blank"
    >
      <IconLinkedin />
    </SocialLink>
    <SocialLink href="https://www.instagram.com/_uptous/" rel="noopener noreferrer" target="_blank">
      <IconInstagram />
    </SocialLink>
  </SocialContainer>
)

const Footer = styled(({ className, hideNewsletter, data }) => {
  const copyrightText = useMemo(() => data.layout.value.footer.copyright.replace('[:date]', new Date().getFullYear()), [
    data.layout.value.footer.copyright,
  ])

  return (
    <footer className={className}>
      {!hideNewsletter && (
        <GreySection>
          <Section fullWidth>
            <NewsletterBanner data={data} />
          </Section>
        </GreySection>
      )}
      <DarkSection fullWidth>
        <DarkSectionFlex>
          <FooterLinks data={data} />
          <Social />
        </DarkSectionFlex>
        <CopyrightText>{copyrightText}</CopyrightText>
      </DarkSection>
    </footer>
  )
})`
  margin-top: 60px;
  ${NewsletterBannerContainer} {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 80px 20px;
    @media (min-width: 1000px) {
      padding: 80px 0;
      ${Header} {
        margin: 0;
      }
    }
    > div:nth-child(2) {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      max-width: 920px;
      flex-direction: column;
      @media (min-width: 1000px) {
        margin-top: 30px;
        flex-direction: row;
      }
      @media (min-width: 1000px) {
        margin-left: 50px;
        margin-top: 0;
      }
      a {
        margin-top: 15px;
        @media (min-width: 1000px) {
          margin-left: 30px;
          margin-top: 0;
        }
      }
    }
  }
  ${DarkSection} {
    background: #0a0a0a;
    padding: 35px 20px 20px;
    position: relative;

    @media (min-width: 1000px) {
      padding: 50px;
    }

    ${Header} {
      color: #fff;
    }
    a {
      display: block;
      line-height: 1.8;
      color: #272a32;
      text-decoration: none;
      color: #fff;
    }
  }
  ${FooterLinksSection} {
    margin-bottom: 30px;
  }
  @media (min-width: 1000px) {
    ${FooterLinksSection} {
      margin-right: 130px;
      margin-bottom: 0;
    }
  }
  ${CopyrightText} {
    font-size: 13px;
    color: #fff;
    text-align: center;

    @media (min-width: 1000px) {
      font-size: 14px;
    }
  }

  @media (min-width: 1000px) {
    ${Section} {
      padding: 5px 50px;
    }
  }
`

export default Footer
