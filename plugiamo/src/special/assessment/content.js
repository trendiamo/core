import AssessmentBase from './base'
import Content from 'app/content'
import data from './data'
import flatten from 'lodash.flatten'
import { compose, lifecycle, withProps, withState } from 'recompose'
import { fetchProducts } from 'special/assessment/utils'
import { h } from 'preact'
import { isSmall } from 'utils'
import { rememberPersona } from './utils'
import { timeout } from 'plugin-base'

const assessProducts = (products, tags) => {
  const productsResult = flatten(tags.map(tag => products.filter(product => product.tag && tag === product.tag)))
  return productsResult.sort((a, b) => !!b.highlight - !!a.highlight)
}

const Assessment = ({
  currentStep,
  currentStepKey,
  endNodeTags,
  hideContentFrame,
  module,
  progress,
  results,
  setCurrentStep,
  setCurrentStepKey,
  setEndNodeTags,
  setProgress,
  setResults,
  setShowAssessmentContent,
  setShowingContent,
  setShowingLauncher,
  showAssessmentContent,
  step,
  steps,
  onToggleContent,
  launcherConfig,
  assessmentIsMainFlow,
  isUnmounting,
  frameStyleStr,
}) => (
  <Content
    assessmentIsMainFlow={assessmentIsMainFlow}
    Component={
      <AssessmentBase
        assessmentIsMainFlow={assessmentIsMainFlow}
        currentStep={currentStep}
        currentStepKey={currentStepKey}
        endNodeTags={endNodeTags}
        module={module}
        progress={progress}
        results={results}
        setCurrentStep={setCurrentStep}
        setCurrentStepKey={setCurrentStepKey}
        setEndNodeTags={setEndNodeTags}
        setProgress={setProgress}
        setResults={setResults}
        setShowAssessmentContent={setShowAssessmentContent}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        showAssessmentContent={showAssessmentContent}
        step={step}
        steps={steps}
      />
    }
    frameStyleStr={frameStyleStr}
    hideContentFrame={hideContentFrame}
    isUnmounting={isUnmounting}
    launcherConfig={launcherConfig}
    onToggleContent={onToggleContent}
    setShowAssessmentContent={setShowAssessmentContent}
    skipEntry={!assessmentIsMainFlow}
  />
)

export default compose(
  withProps({
    module:
      data[process.env.ASSESSMENT || location.hostname] && data[process.env.ASSESSMENT || location.hostname].assessment,
  }),
  withState('currentStepKey', 'setCurrentStepKey', ({ showAssessmentContent }) =>
    typeof showAssessmentContent !== 'boolean' ? showAssessmentContent.key : 'root'
  ),
  withProps(({ module, currentStepKey }) => ({
    step: module && module.steps[currentStepKey],
    steps: module && module.steps,
  })),
  withState('currentStep', 'setCurrentStep', ({ step }) => step),
  withState('progress', 'setProgress', ({ showAssessmentContent }) =>
    typeof showAssessmentContent !== 'boolean' ? showAssessmentContent.progress : 0
  ),
  withState('results', 'setResults', []),
  withState('endNodeTags', 'setEndNodeTags', []),
  withProps(({ currentStepKey }) => ({
    hideContentFrame: !isSmall() && currentStepKey === 'store',
  })),
  lifecycle({
    componentDidMount() {
      const { module } = this.props
      rememberPersona(module.persona)
    },
    componentDidUpdate(prevProps) {
      const { step, setCurrentStep, currentStepKey, progress, setProgress } = this.props
      if (prevProps.step !== step) {
        if (currentStepKey === 'store') {
          const _this = this
          let fetchStartTime = performance.now()
          fetchProducts(results => {
            const { setResults, endNodeTags } = _this.props
            const client = results.find(client => client.hostname === location.hostname)
            timeout.set(
              'settingResults',
              () => {
                setResults(assessProducts(client.products, endNodeTags))
              },
              Math.max(800 - (performance.now() - fetchStartTime), 10)
            )
          })
        }
        if (prevProps.currentStepKey === 'store' && progress === 100) {
          setTimeout(() => {
            setProgress(progress - 33)
          }, 2000)
        }
        setTimeout(
          () => {
            setCurrentStep(step)
          },
          prevProps.step ? 750 : 0
        )
      }
    },
  })
)(Assessment)
