import Background from './background'
import Content, { PersonaName } from './content'
import defaultConfig from './config'
import FlowBackButton from 'shared/flow-back-button'
import styled from 'styled-components'
import { branch, compose, renderComponent, withProps } from 'recompose'
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
  ({ persona, currentDescription, config }) => (
    <CoverBase config={config}>
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

export const CoverBridge = ({ header, minimized, config }) => (
  <CoverBase backgroundColor={header.backgroundColor} config={config} hackathon minimized={minimized}>
    <Background config={config} header={header} minimized={minimized} />
    <Content config={config} header={header} minimized={minimized} />
  </CoverBase>
)

export default compose(
  withProps(({ config }) => ({
    config: { ...defaultConfig, ...config },
  })),
  branch(({ hackathon }) => hackathon, renderComponent(CoverBridge))
)(CoverSimpleChat)
