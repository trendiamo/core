import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'

const CoverAnimation = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: calc(100% - ${({ minimized }) => (minimized ? 200 : 140)}px);
  left: ${({ minimized }) => (minimized ? 200 : 140)}px;
  max-height: ${({ minimized, headerConfig }) => (minimized ? headerConfig.heights.min : headerConfig.heights.max)}px;
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
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ header }) => header.backgroundColor || '#fff'};
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 50px;
    left: ${({ minimized }) => (minimized ? 199 : 139)}px;
    background: linear-gradient(
      90deg,
      ${({ header }) => header.backgroundColor || 'rgba(255, 255, 255, 255)'},
      rgba(255, 255, 255, 0)
    );
    z-index: 11;
    transition: all 0.4s ease-in-out;
  }
  ${({ hide }) => hide && 'opacity: 0;'}
  transition: opacity 0.4s ease-in-out;
`

const Background = ({ minimized, header, imageUrl, animationUrl, headerConfig, hide }) => (
  <ImageContainer header={header} hide={hide} minimized={minimized}>
    <CoverAnimation headerConfig={headerConfig} minimized={minimized} src={animationUrl} />
    <CoverImage image={imageUrl} minimized={minimized} />
  </ImageContainer>
)

export default compose(
  withProps(({ header, big }) => {
    const imageUrl = imgixUrl(header.imageUrl, { fit: 'crop', w: big ? 800 : 160, h: big ? 200 : 90 })
    const animated = header.animationUrl && header.animationUrl.substr(header.animationUrl.length - 3) === 'gif'
    const animationUrl = header.animationUrl || imageUrl
    return {
      imageUrl,
      animationUrl: animated ? animationUrl : imgixUrl(animationUrl, { fit: 'crop', w: 220, h: 140 }),
    }
  })
)(Background)
