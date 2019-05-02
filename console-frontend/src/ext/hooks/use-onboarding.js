import auth from 'auth'
import routes from 'app/routes'
import { StoreContext } from 'ext/hooks/store'
import { useContext, useEffect, useState } from 'react'

const initialOnboardingState = {
  stageIndex: 0,
  stepIndex: 0,
  run: false,
  help: { run: false },
}

export const useOnboarding = location => {
  const { store, setStore } = useContext(StoreContext)
  const [onboarding, setOnboarding] = useState(initialOnboardingState)
  useEffect(() => {
    const stageIndex = auth.getUser().onboardingStage
    const newOnboardingState = {
      ...onboarding,
      stageIndex,
      run: !(location.pathname === routes.root()) && stageIndex === 0,
    }
    setOnboarding(newOnboardingState)
  }, [])
  useEffect(() => setStore({ ...store, onboarding, setOnboarding }), [onboarding])

  return {
    store,
    setStore,
    onboardingReady: !!store.onboarding,
  }
}

export const useOnboardingConsumer = () => {
  const { store } = useContext(StoreContext)
  return {
    onboarding: store.onboarding,
    setOnboarding: store.setOnboarding,
  }
}

export const useOnboardingHelp = (help, location) => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()
  useEffect(() => {
    setTimeout(() => {
      setOnboarding({ ...onboarding, help: { ...onboarding.help, ...help, pathname: location.pathname } })
    }, 0)
  }, [])
}
