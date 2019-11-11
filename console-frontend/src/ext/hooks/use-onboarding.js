import { StoreContext } from 'ext/hooks/store'
import { useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

const initialOnboardingState = {
  stageIndex: 0,
  stepIndex: 0,
  run: false,
  help: { run: false },
}

export const useOnboarding = () => {
  const { store, setStore } = useContext(StoreContext)

  const [onboarding, dispatch] = useReducer((state, action) => {
    if (action.type === 'merge') {
      return { ...state, ...action.value }
    } else if (action.type === 'mergeHelp') {
      return { ...state, help: { ...state.help, ...action.value } }
    } else {
      throw new Error()
    }
  }, initialOnboardingState)

  const setOnboarding = useCallback(value => dispatch({ type: 'merge', value }), [dispatch])
  const setOnboardingHelp = useCallback(value => dispatch({ type: 'mergeHelp', value }), [dispatch])

  useEffect(() => {
    setStore({ onboarding, setOnboarding, setOnboardingHelp })
  }, [onboarding, setOnboarding, setOnboardingHelp, setStore])

  return !!store.onboarding
}

export const useOnboardingConsumer = () => {
  const { store } = useContext(StoreContext)

  const onboardingInfo = useMemo(
    () => ({
      onboarding: store.onboarding,
      setOnboarding: store.setOnboarding,
      setOnboardingHelp: store.setOnboardingHelp,
    }),
    [store.onboarding, store.setOnboarding, store.setOnboardingHelp]
  )

  return onboardingInfo
}

export const useOnboardingHelp = help => {
  const { setOnboardingHelp } = useOnboardingConsumer()
  useEffect(() => {
    setOnboardingHelp && setOnboardingHelp(help)
  }, [help, setOnboardingHelp])
}
