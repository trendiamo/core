import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const srcSet = `
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_180x.png?v=1516024316 180w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_360x.png?v=1516024316 360w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_540x.png?v=1516024316 540w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_720x.png?v=1516024316 720w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_900x.png?v=1516024316 900w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_1080x.png?v=1516024316 1080w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_1296x.png?v=1516024316 1296w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_1512x.png?v=1516024316 1512w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_1728x.png?v=1516024316 1728w,
//cdn.shopify.com/s/files/1/2776/1260/files/favicon_2048x.png?v=1516024316 2048w
`

const StyledImg = styled.img`
  max-width: 64px;
  vertical-align: top;
`

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.13);
  z-index: 999;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  display: inline-block;
`

const Header = () => (
  <StyledHeader role="banner">
    <div itemScope itemType="http://schema.org/Organization">
      <StyledLink to="/">
        <StyledImg
          alt="Trendiamo"
          className="lazyload"
          data-aspectratio="1.0"
          data-sizes="auto"
          data-srcset={srcSet}
          data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
          sizes="64px"
          src="//cdn.shopify.com/s/files/1/2776/1260/files/favicon_300x300.png?v=1516024316"
        />
      </StyledLink>
    </div>
  </StyledHeader>
)

export default Header
