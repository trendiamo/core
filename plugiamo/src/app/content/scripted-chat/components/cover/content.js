import styled from 'styled-components'
import VideoButton from './video-button'
import { h } from 'preact'

const Name = styled.div`
  color: #333;
  position: absolute;
  font-size: 20px;
  font-weight: 700;
  backface-visibility: hidden;
  opacity: 1;
  transition: 1s opacity;
  top: 0;
  transition-delay: 0.4s;
  ${({ minimized }) =>
    minimized &&
    `
    transition: 0.4s all ease-out;
    opacity: 0;
    top: -10px;
  `}
`

const NameHelper = styled.div`
  color: #333;
  font-size: 20px;
  font-weight: 700;
  max-height: 50px;
  opacity: 0;
  transition: max-height 0.8s ease-out, margin-bottom 0.4s;
  user-select: none;
  margin-bottom: 5px;
  ${({ minimized }) =>
    minimized &&
    `
    margin-bottom: 0;
    max-height: 0;
    transition: 0.4s all;
  `}
`

const NameMinimized = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 700;
  backface-visibility: hidden;
  max-height: 0;
  transition: 0.4s all;
  opacity: 0;
  ${({ minimized }) =>
    minimized &&
    `
    max-height: 50px;
    opacity: 1;
    transition: 1s all;
    transition-delay: 0.0s;
  `}
`

const PresentedBy = styled.div`
  font-size: 14px;
  backface-visibility: hidden;
`

const TextContainer = styled.div`
  width: 200px;
  left: 20px;
  z-index: 100;
`

const Header = styled.div`
  position: relative;
`

export const PersonaName = styled.div`
  color: #fff;
  display: inline-block;
`

const Content = ({ minimized, header }) => (
  <TextContainer minimized={minimized}>
    <Header>
      <NameMinimized minimized={minimized}>{header.productTitle}</NameMinimized>
      <Name minimized={minimized}>{header.productTitle}</Name>
      <NameHelper minimized={minimized}>{header.productTitle}</NameHelper>
    </Header>
    <PresentedBy minimized={minimized}>
      {'presented by '}
      <b>{header.personaInstagramHandle}</b>
    </PresentedBy>
    {header.video && <VideoButton video={header.video} />}
  </TextContainer>
)

export default Content
