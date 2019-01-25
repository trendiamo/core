import React from 'react'
import styled from 'styled-components'
import { animate } from 'shared/animate'
import { SingleImage } from 'shared/list'

const Cover = styled.div`
  background-color: #232323;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 100px;
  min-height: 100px;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;

  @media (min-height: 500px) {
    position: fixed;
  }
`

const CoverInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const BelowCover = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-height: 500px) {
    overflow-y: auto;
    margin-top: 100px;
  }
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

const CoverImg = ({ src, imgRef }) => (
  <CoverImgContainer ref={imgRef}>
    <SingleImage src={src} />
  </CoverImgContainer>
)

const PaddedCover = styled.div`
  padding-left: 10px;
`

const PersonaDescription = animate(
  styled.div`
    color: #ddd;
    font-size: 12px;
  `,
  250 * 2
)

export { BelowCover, CoverImg, CoverInner, PersonaDescription, PaddedCover }

export default Cover
