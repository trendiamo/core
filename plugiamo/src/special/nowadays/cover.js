import styled from 'styled-components'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'

const CoverBase = styled.div`
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 140px;
  max-height: ${({ minimized }) => (minimized ? 90 : 140)}px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 2;
  transition: max-height 0.4s ease-in-out;
  box-shadow: 0px 5px 10px rgba(25, 39, 54, 0.13);

  flex-shrink: 0;
`

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

const CoverAnimation = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: calc(100% - ${({ minimized }) => (minimized ? 200 : 140)}px);
  left: ${({ minimized }) => (minimized ? 200 : 140)}px;
  max-height: ${({ minimized }) => (minimized ? 90 : 140)}px;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease-in-out;
  z-index: 10;
  opacity: ${({ minimized }) => (minimized ? 0 : 1)};
`

const CoverImage = styled.div`
  background-image: url('${({ image }) => image}');
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${({ minimized }) => (minimized ? 200 : 140)}px;
  height: 100%;
  background-size: cover;
  transition: all 0.4s ease-in-out;
  opacity: ${({ minimized }) => (minimized ? 1 : 0)};
`

const ImageContainer = styled.div`
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 50px;
    left: ${({ minimized }) => (minimized ? 199 : 139)}px;
    background: linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0));
    z-index: 11;
    transition: all 0.4s ease-in-out;
  }
`

export const Cover = ({ header, minimized }) => (
  <CoverBase minimized={minimized}>
    <ImageContainer minimized={minimized}>
      <CoverAnimation minimized={minimized} src={header.animationUrl} />
      <CoverImage image={imgixUrl(header.imageUrl, { fit: 'crop', 'max-w': 160, 'max-h': 90 })} minimized={minimized} />
    </ImageContainer>
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
    </TextContainer>
  </CoverBase>
)
