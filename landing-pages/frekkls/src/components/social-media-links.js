import React from 'react'
import styled from 'styled-components'

import facebookIcon from '../images/icon-facebook.svg'
import linkedinIcon from '../images/icon-linkedin.svg'
import twitterIcon from '../images/icon-twitter.svg'
import whatsappIcon from '../images/icon-whatsapp.svg'

const FacebookLink = ({ location, size }) => (
  <a href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`} title="Share on Facebook">
    <img alt="Share on Facebook" height={size} src={facebookIcon} width={size} />
  </a>
)

const LinkedinLink = ({ location, size }) => (
  <a
    href={`https://www.linkedin.com/shareArticle?mini=true&url=${location.href}&title=&summary=&source=`}
    title="Share on Linkedin"
  >
    <img alt="Share on Linkedin" src={linkedinIcon} width={size} />
  </a>
)

const TwitterLink = ({ location, size }) => (
  <a href={`https://twitter.com/home?status=${location.href} `} title="Share on Twitter">
    <img alt="Share on Twitter" src={twitterIcon} width={size} />
  </a>
)

const WhatsappLink = ({ location, size }) => (
  <a href={`https://api.whatsapp.com/send?text=${location.href} `} title="Share on Whatsapp">
    <img alt="Share on Whatsapp" src={whatsappIcon} width={size} />
  </a>
)

const SocialMediaLinks = styled(({ className, location, size = 40 }) => (
  <div className={className}>
    <FacebookLink location={location} size={size} />
    <LinkedinLink location={location} size={size} />
    <TwitterLink location={location} size={size} />
    <WhatsappLink location={location} size={size} />
  </div>
))`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;

  > a {
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    > img {
      display: block;
    }
  }
`

export default SocialMediaLinks
