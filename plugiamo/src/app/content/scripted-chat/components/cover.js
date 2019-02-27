import FlowBackButton from 'shared/flow-back-button'
import styled from 'styled-components'
import { branch, compose, renderComponent } from 'recompose'
import { CoverImg, PaddedCover, PersonaDescription, PersonaInstagram, withTextTyping } from 'plugin-base'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'

const FlexDiv = styled.div`
  display: flex;
`

const CoverBase = styled.div`
  background-color: ${({ hackathon }) => (hackathon ? '#fff' : '#232323')};
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 140px;
  max-height: ${({ minimized }) => (minimized ? 90 : 140)}px;
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

const PersonaName = styled.span`
  color: #fff;
`

export const CoverScriptedChat = compose(withTextTyping(({ persona }) => persona.description, 300))(
  ({ persona, currentDescription }) => (
    <CoverBase>
      <FlowBackButton />
      <FlexDiv>
        <CoverImg src={imgixUrl(persona.profilePic.url, { fit: 'crop', w: 45, h: 45 })} />
        <PaddedCover>
          <PersonaName>{persona.name}</PersonaName>
          <PersonaInstagram url={persona.instagramUrl} />
          <PersonaDescription text={persona.description} typingText={currentDescription} />
        </PaddedCover>
      </FlexDiv>
    </CoverBase>
  )
)

export const CoverHackathon = ({ header, minimized }) => (
  <CoverBase hackathon minimized={minimized}>
    <ImageContainer minimized={minimized}>
      <CoverAnimation minimized={minimized} src={header.animationUrl} />
      <CoverImage image={imgixUrl(header.imageUrl, { fit: 'crop', w: 160, h: 90 })} minimized={minimized} />
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

export default compose(branch(({ hackathon }) => hackathon, renderComponent(CoverHackathon)))(CoverScriptedChat)