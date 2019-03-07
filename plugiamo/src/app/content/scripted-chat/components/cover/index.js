import Background from './background'
import Content, { PersonaName } from './content'
import FlowBackButton from 'shared/flow-back-button'
import styled from 'styled-components'
import { branch, compose, renderComponent } from 'recompose'
import {
  Cover as CoverBase,
  CoverImg,
  imgixUrl,
  PaddedCover,
  PersonaDescription,
  PersonaInstagram,
  withTextTyping,
} from 'plugin-base'
import { h } from 'preact'

const FlexDiv = styled.div`
  display: flex;
`

export const CoverSimpleChat = compose(withTextTyping(({ persona }) => persona.description, 300))(
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

export const CoverBridge = ({ header, minimized }) => (
  <CoverBase hackathon minimized={minimized}>
    <Background header={header} minimized={minimized} />
    <Content header={header} minimized={minimized} />
  </CoverBase>
)

export default compose(branch(({ hackathon }) => hackathon, renderComponent(CoverBridge)))(CoverSimpleChat)
