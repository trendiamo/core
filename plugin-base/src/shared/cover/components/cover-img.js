import SellerPlaceholderIcon from 'icons/icon-placeholder-seller.svg'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { SingleImage } from 'shared/list'

const EmptySellerPic = styled(SellerPlaceholderIcon)`
  fill: #f2f4f7;
  margin-top: -2px;
`

const CoverImgContainer = styled.div`
  border-radius: 50%;
  height: 45px;
  min-height: 45px;
  width: 45px;
  min-width: 45px;
  position: relative;
  overflow: hidden;
`

const CoverImg = forwardRef(({ src }, ref) => (
  <CoverImgContainer ref={ref}>{src ? <SingleImage src={src} /> : <EmptySellerPic />}</CoverImgContainer>
))

export default CoverImg
