import Background from 'app/content/simple-chat/cover/background'
import Content from 'app/content/simple-chat/cover/content'
import { BackButton, Cover, headerConfig as defaultHeaderConfig } from 'plugin-base'
import { h } from 'preact'
import { isSmall } from 'utils'
import { useEffect, useMemo, useReducer } from 'preact/hooks'

const CoverAssessment = ({
  backButtonLabel,
  big,
  clickActions,
  goToPrevStep,
  headerConfig,
  minimized,
  showBackButton,
  step,
  isFinalStep,
}) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'switchHeaders') {
        if (!state.headers) {
          return { ...state, headers: [action.value, action.value] }
        } else {
          const newHeaders = state.toggle ? [action.value, state.headers[1]] : [state.headers[0], action.value]
          if (state.finalStepCounter === 0 || isSmall()) {
            setTimeout(() => dispatch({ type: 'toggle' }), 980)
          }
          return { ...state, headers: newHeaders, finalStepCounter: Math.max(0, state.finalStepCounter - 1) }
        }
      } else if (action.type === 'toggle') {
        return { ...state, toggle: !state.toggle }
      } else if (action.type === 'setFinalStepCounter') {
        return { ...state, finalStepCounter: action.value }
      } else {
        throw new Error()
      }
    },
    { toggle: false, headers: null, finalStepCounter: 0 }
  )

  const newHeaderConfig = useMemo(() => ({ ...defaultHeaderConfig, ...headerConfig }), [headerConfig])

  useEffect(() => {
    if (!isFinalStep) return
    dispatch({ type: 'setFinalStepCounter', value: 2 })
  }, [isFinalStep])

  useEffect(() => {
    dispatch({ type: 'switchHeaders', value: step.header })
  }, [step.header])

  const { headers, toggle } = state

  if (!headers) return

  const firstHeader = headers[0]
  const secondHeader = headers[1]
  const activeHeader = headers[toggle ? 1 : 0]

  return (
    <Cover backgroundColor="#fff" hackathon headerConfig={newHeaderConfig} minimized={minimized}>
      <BackButton
        backButtonConfig={activeHeader.backButton}
        color="black"
        flexibleCover
        hide={!showBackButton}
        label={backButtonLabel}
        onClick={goToPrevStep}
      />
      <Background big={big} header={secondHeader} headerConfig={newHeaderConfig} hide={!toggle} minimized={minimized} />
      <Background big={big} header={firstHeader} headerConfig={newHeaderConfig} hide={toggle} minimized={minimized} />
      <Content clickActions={clickActions} header={activeHeader} headerConfig={newHeaderConfig} minimized={minimized} />
    </Cover>
  )
}

export default CoverAssessment
