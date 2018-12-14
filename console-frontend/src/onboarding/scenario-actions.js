import auth from 'auth'
import { apiOnboardingSet } from 'utils/auth-requests'

const finalize = () => {
  apiOnboardingSet({ user: { showOnboarding: false } })
  auth.setUser({ ...auth.getUser(), showOnboarding: false })
}

export { finalize }
