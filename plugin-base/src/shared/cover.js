import React from 'react'
import styled from 'styled-components'
import { SingleImage } from 'shared/list'

const defaultHeaderConfig = {
  heights: { min: 90, max: 140 },
}

const Cover = styled.div`
  background-color: ${({ hackathon, backgroundColor = '#fff' }) => (hackathon ? backgroundColor : '#232323')};
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: ${({ headerConfig = defaultHeaderConfig }) => headerConfig.heights.max};
  max-height: ${({ minimized, headerConfig = defaultHeaderConfig }) =>
    minimized ? headerConfig.heights.min : headerConfig.heights.max}px;
  ${({ hackathon }) =>
    !hackathon &&
    `
  height: 100px;
  max-height: 100px;
`}
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  transition: max-height 0.4s ease-in-out, background-color 0.4s ease-in-out;
  box-shadow: 0px 5px 10px rgba(25, 39, 54, 0.13);
  flex-shrink: 0;
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
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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

const PersonaDescriptionContainer = styled.div`
  position: relative;
`

const PersonaDescriptionHelper = styled.div`
  color: transparent;
  font-size: 12px;
  user-select: none;
`

const PersonaDescriptionTyping = styled.div`
  color: #ddd;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
`

const PersonaDescription = ({ text, typingText }) => (
  <PersonaDescriptionContainer>
    <PersonaDescriptionHelper>{text}</PersonaDescriptionHelper>
    <PersonaDescriptionTyping>{typingText}</PersonaDescriptionTyping>
  </PersonaDescriptionContainer>
)

export { BelowCover, CoverImg, CoverInner, PersonaDescription, PaddedCover }

export default Cover
