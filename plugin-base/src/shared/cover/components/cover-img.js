import PersonaPlaceholderIcon from 'icons/icon-placeholder-persona.svg'
import React from 'react'
import styled from 'styled-components'
import { SingleImage } from 'shared/list'

const EmptyPersonaPic = styled(PersonaPlaceholderIcon)`
  fill: #f2f4f7;
  margin-top: -2px;
`

const CoverImg = ({ src, imgRef }) => (
  <CoverImgContainer ref={imgRef}>{src ? <SingleImage src={src} /> : <EmptyPersonaPic />}</CoverImgContainer>
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
