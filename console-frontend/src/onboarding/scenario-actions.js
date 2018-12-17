import auth from 'auth'
import { apiOnboardingSet } from 'utils/auth-requests'

const changeStage = index => () => {
  apiOnboardingSet({ user: { onboardingStage: index } })
  auth.setUser({ ...auth.getUser(), onboardingStage: index })
}

export { changeStage }
