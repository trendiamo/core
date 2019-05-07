import React from 'react'
import styled from 'styled-components'
import { SingleImage } from 'shared/list'

const CoverImg = ({ src, imgRef }) => (
  <CoverImgContainer ref={imgRef}>
    <SingleImage src={src} />
  </CoverImgContainer>
)

const CoverImgContainer = styled.div`
  border-radius: 50%;
  height: 45px;
  min-height: 45px;
  width: 45px;
  min-width: 45px;
  position: relative;
  overflow: hidden;
`

export default CoverImg
