import auth from 'auth'
import AuthLayout from 'auth/layout'
import FirstStep from './first-step'
import React, { useState } from 'react'
import SecondStep from './second-step'

const FirstSideContent = () => (
  <>
    <h2>{'Almost There'}</h2>
    <p>{'Provide information about your social media accounts so we can connect you with brands that fit you best.'}</p>
  </>
)

const SecondSideContent = () => (
  <>
    <h2>{'Just One Last Step'}</h2>
    <p>
      {
        'Provide information about what describes your interests and values best so we can match you with the brands that fit you best.'
      }
    </p>
  </>
)

const WelcomePage = () => {
  const [welcomeStep, setWelcomeStep] = useState(auth.getUser().socialMediaUrl ? 2 : 1)

  return (
    <AuthLayout SideContent={welcomeStep === 1 ? FirstSideContent : SecondSideContent}>
      {welcomeStep === 1 ? <FirstStep setWelcomeStep={setWelcomeStep} /> : <SecondStep />}
    </AuthLayout>
  )
}

export default WelcomePage
