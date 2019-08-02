import React from 'react'
import styled from 'styled-components'

import facebookIcon from '../images/icon-facebook.svg'
import linkedinIcon from '../images/icon-linkedin.svg'
import twitterIcon from '../images/icon-twitter.svg'
import whatsappIcon from '../images/icon-whatsapp.svg'

const FacebookLink = ({ path, size }) => (
  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://frekkls.com${path}`} title="Share on Facebook">
    <img alt="Share on Facebook" height={size} src={facebookIcon} width={size} />
  </a>
)

const LinkedinLink = ({ path, size }) => (
  <a
    href={`https://www.linkedin.com/shareArticle?mini=true&url=https://frekkls.com${path}&title=&summary=&source=`}
    title="Share on Linkedin"
  >
    <img alt="Share on Linkedin" src={linkedinIcon} width={size} />
  </a>
)

const TwitterLink = ({ path, size }) => (
  <a href={`https://twitter.com/home?status=https://frekkls.com${path} `} title="Share on Twitter">
    <img alt="Share on Twitter" src={twitterIcon} width={size} />
  </a>
)

const WhatsappLink = ({ path, size }) => (
  <a href={`https://api.whatsapp.com/send?text=https://frekkls.com${path} `} title="Share on Whatsapp">
    <img alt="Share on Whatsapp" src={whatsappIcon} width={size} />
  </a>
)

const SocialMediaLinks = styled(({ className, path, size = 40 }) => (
  <div className={className}>
    <FacebookLink path={path} size={size} />
    <LinkedinLink path={path} size={size} />
    <TwitterLink path={path} size={size} />
    <WhatsappLink path={path} size={size} />
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
