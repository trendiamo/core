import Background from './background'
import Content, { PersonaName } from './content'
import defaultConfig from './config'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import styled from 'styled-components'
import { BackButton } from 'plugin-base'
import { branch, compose, lifecycle, renderComponent, withProps, withState } from 'recompose'
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

const CoverAssessmentTemplate = ({ headers, toggle, minimized, config, goToPrevStep, showBackButton }) => (
  <CoverBase backgroundColor="#fff" config={config} hackathon minimized={minimized}>
    <BackButton
      backButtonLabel={getFrekklsConfig().i18n.backButton}
      color="black"
      config={headers[toggle ? 1 : 0].backButton}
      flexibleCover
      hide={!showBackButton}
      onClick={goToPrevStep}
    />
    <Background config={config} header={headers[1]} hide={!toggle} minimized={minimized} />
    <Background config={config} header={headers[0]} hide={toggle} minimized={minimized} />
    <Content
      config={config}
      goToPrevStep={goToPrevStep}
      header={headers[toggle ? 1 : 0]}
      minimized={minimized}
      showBackButton={showBackButton}
    />
  </CoverBase>
)

const CoverAssessment = compose(
  withState('toggle', 'setToggle', false),
  withState('headers', 'setHeaders', ({ step }) => [step.header, step.header]),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { toggle, setToggle, setHeaders, headers, step } = this.props
      if (prevProps.step.header !== step.header) {
        const newHeaders = toggle ? [step.header, headers[1]] : [headers[0], step.header]
        setHeaders(newHeaders)
        setTimeout(() => {
          setToggle(!toggle)
        }, 980)
      }
    },
  })
)(CoverAssessmentTemplate)

export default compose(
  withProps(({ config }) => ({
    config: { ...defaultConfig, ...config },
  })),
  branch(({ hackathon }) => hackathon, renderComponent(CoverBridge)),
  branch(({ assessment }) => assessment, renderComponent(CoverAssessment))
)(CoverSimpleChat)
