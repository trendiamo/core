import styled from 'styled-components'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'
import { useMemo } from 'preact/hooks'

const CoverImage = styled.img`
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
  opacity: ${({ minimized, firstLayer }) => firstLayer ^ minimized};
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

const Background = ({ big, minimized, header, headerConfig, hide }) => {
  const imageUrl = useMemo(() => imgixUrl(header.imageUrl, { fit: 'crop', w: big ? 800 : 160, h: big ? 200 : 90 }), [
    big,
    header.imageUrl,
  ])
  const animationUrl = useMemo(() => {
    const animated = header.animationUrl && header.animationUrl.substr(header.animationUrl.length - 3) === 'gif'
    const animationUrl = header.animationUrl || imageUrl
    return animated ? animationUrl : imgixUrl(animationUrl, { fit: 'crop', w: 220, h: 140 })
  }, [header.animationUrl, imageUrl])

  return (
    <ImageContainer header={header} hide={hide} minimized={minimized}>
      <CoverImage firstLayer headerConfig={headerConfig} minimized={minimized} src={animationUrl} />
      <CoverImage headerConfig={headerConfig} minimized={minimized} src={imageUrl} />
    </ImageContainer>
  )
}

export default Background
