import Background from './background'
import Content, { PersonaName } from './content'
import defaultHeaderConfig from './header-config'
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
  ({ persona, currentDescription, headerConfig }) => (
    <CoverBase headerConfig={headerConfig}>
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

export const CoverBridge = ({ header, minimized, headerConfig }) => (
  <CoverBase backgroundColor={header.backgroundColor} hackathon headerConfig={headerConfig} minimized={minimized}>
    <Background header={header} headerConfig={headerConfig} minimized={minimized} />
    <Content header={header} headerConfig={headerConfig} minimized={minimized} />
  </CoverBase>
)

const CoverAssessmentTemplate = ({ headers, toggle, minimized, headerConfig, goToPrevStep, showBackButton }) => (
  <CoverBase backgroundColor="#fff" hackathon headerConfig={headerConfig} minimized={minimized}>
    <BackButton
      backButtonLabel={getFrekklsConfig().i18n.backButton}
      buttonConfig={headers[toggle ? 1 : 0].backButton}
      color="black"
      flexibleCover
      hide={!showBackButton}
      onClick={goToPrevStep}
    />
    <Background header={headers[1]} headerConfig={headerConfig} hide={!toggle} minimized={minimized} />
    <Background header={headers[0]} headerConfig={headerConfig} hide={toggle} minimized={minimized} />
    <Content
      goToPrevStep={goToPrevStep}
      header={headers[toggle ? 1 : 0]}
      headerConfig={headerConfig}
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
  withProps(({ headerConfig }) => ({
    headerConfig: { ...defaultHeaderConfig, ...headerConfig },
  })),
  branch(({ hackathon }) => hackathon, renderComponent(CoverBridge)),
  branch(({ assessment }) => assessment, renderComponent(CoverAssessment))
)(CoverSimpleChat)
