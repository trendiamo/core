import React from 'react'
import styled from 'styled-components'

import facebookIcon from '../images/icon-facebook.svg'
import instagramIcon from '../images/icon-instagram.svg'
import twitterIcon from '../images/icon-twitter.svg'
import youtubeIcon from '../images/icon-youtube.svg'

const FacebookIcon = styled.img.attrs({
  src: facebookIcon,
})`
  padding: 0px 10px;
`

const InstagramIcon = styled.img.attrs({
  src: instagramIcon,
})`
  padding: 0px 10px;
`

const TwitterIcon = styled.img.attrs({
  src: twitterIcon,
})`
  padding: 0px 10px;
`

const YoutubeIcon = styled.img.attrs({
  src: youtubeIcon,
})`
  padding: 0px 10px;
`

const FacebookLink = () => (
  <a href="https://www.facebook.com/frekklsapp/">
    <FacebookIcon />
  </a>
)

const InstagramLink = () => (
  <a href="https://www.instagram.com/frekkls.app/">
    <InstagramIcon />
  </a>
)

const TwitterLink = () => (
  <a href="https://twitter.com/frekkls_">
    <TwitterIcon />
  </a>
)

const YoutubeLink = () => (
  <a href="https://www.youtube.com/channel/UCvx2ObjztTcVKvvUBry2S-Q/featured">
    <YoutubeIcon />
  </a>
)

export { FacebookLink, InstagramLink, TwitterLink, YoutubeLink }
