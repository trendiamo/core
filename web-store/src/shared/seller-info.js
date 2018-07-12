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

const SellerInfo = ({ taxon }) => (
  <SellerInfoContainer>
    <Link to={`/collections/${taxon.permalink}`}>
      <SellerPic alt="" height="80" src={taxon.iconUrl} width="80" />
    </Link>
    <div>
      <Link to={`/collections/${taxon.permalink}`}>
        <SellerName>{taxon.name}</SellerName>
      </Link>
    </div>
  </SellerInfoContainer>
)

export default SellerInfo
