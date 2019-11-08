import auth from 'auth'
import AuthLayout from 'auth/layout'
import FirstStep from './first-step'
import React, { useState } from 'react'
import SecondStep from './second-step'

const FirstSideContent = () => (
  <>
    <h2>{'Almost There'}</h2>
    <p>{'Your social media will help us match you with the brands that fit you best.'}</p>
  </>
)

const SecondSideContent = () => (
  <>
    <h2>{'Just One Last Step'}</h2>
    <p>{'Your interests and values will help us match you with the brands that fit you best.'}</p>
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
