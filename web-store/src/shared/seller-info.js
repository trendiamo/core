import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const SellerInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const SellerPic = styled.img`
  border-radius: 50%;
  margin-right: 1rem;
`

const SellerName = styled.div`
  font-size: 22px;
  color: #222;
  font-weight: bold;
`

const SellerInfo = () => (
  <SellerInfoContainer>
    <Link to="/">
      <SellerPic alt="Gilmour Niggemann" height="80" src="https://placeimg.com/100/100/people" width="80" />
    </Link>
    <div>
      <Link to="/">
        <SellerName>{'Gilmour Niggemann'}</SellerName>
      </Link>
      <div>{'Some text about myself.'}</div>
    </div>
  </SellerInfoContainer>
)

export default SellerInfo
