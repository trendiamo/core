import Background from 'app/content/simple-chat/cover/background'
import Content from 'app/content/simple-chat/cover/content'
import { BackButton, Cover, headerConfig as defaultHeaderConfig } from 'plugin-base'
import { compose, lifecycle, withProps, withState } from 'recompose'
import { h } from 'preact'

const CoverAssessment = ({
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

export default compose(
  withProps(({ headerConfig }) => ({
    headerConfig: { ...defaultHeaderConfig, ...headerConfig },
  })),
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
)(CoverAssessment)
