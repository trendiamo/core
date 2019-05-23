import Background from 'simple-chat/components/cover/background'
import Content from 'simple-chat/components/cover/content'
import React from 'react'
import { BackButton, Cover } from 'shared'
import { compose, lifecycle, withState } from 'recompose'

const CoverAssessmentTemplate = ({
  headers,
  backButtonLabel,
  toggle,
  minimized,
  headerConfig,
  goToPrevStep,
  showBackButton,
  clickActions,
  big,
}) => (
  <Cover backgroundColor="#fff" hackathon headerConfig={headerConfig} minimized={minimized}>
    <BackButton
      backButtonConfig={headers[toggle ? 1 : 0].backButton}
      color="black"
      flexibleCover
      hide={!showBackButton}
      label={backButtonLabel}
      onClick={goToPrevStep}
    />
    <Background big={big} header={headers[1]} headerConfig={headerConfig} hide={!toggle} minimized={minimized} />
    <Background big={big} header={headers[0]} headerConfig={headerConfig} hide={toggle} minimized={minimized} />
    <Content
      clickActions={clickActions}
      header={headers[toggle ? 1 : 0]}
      headerConfig={headerConfig}
      minimized={minimized}
    />
  </Cover>
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

export default CoverAssessment
