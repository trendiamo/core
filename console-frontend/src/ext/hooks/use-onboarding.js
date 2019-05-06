import auth from 'auth'
import routes from 'app/routes'
import { StoreContext } from 'ext/hooks/store'
import { useCallback, useContext, useEffect, useReducer } from 'react'

const initialOnboardingState = {
  stageIndex: 0,
  stepIndex: 0,
  run: false,
  help: { run: false },
}

export const useOnboarding = location => {
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
  useEffect(
    () => {
      const stageIndex = auth.getUser().onboardingStage
      const newOnboardingState = {
        stageIndex,
        run: !(location.pathname === routes.root()) && stageIndex === 0,
      }
      setOnboarding(newOnboardingState)
    },
    [location, setOnboarding]
  )
  useEffect(() => setStore({ onboarding, setOnboarding, setOnboardingHelp }), [
    onboarding,
    setOnboarding,
    setOnboardingHelp,
    setStore,
  ])

  return !!store.onboarding
}

export const useOnboardingConsumer = () => {
  const { store } = useContext(StoreContext)
  return {
    onboarding: store.onboarding,
    setOnboarding: store.setOnboarding,
    setOnboardingHelp: store.setOnboardingHelp,
  }
}

export const useOnboardingHelp = help => {
  const { setOnboardingHelp } = useOnboardingConsumer()
  useEffect(() => setOnboardingHelp(help), [help, setOnboardingHelp])
}
