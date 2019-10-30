import React, { useCallback, useEffect, useState } from 'react'
import {
  AcceptTerms,
  Footer,
  Hero,
  HomeWrapper,
  PrivacyPolicy,
  SkeletonDisplayPage,
  TermsAndConditions,
  ThankYou,
} from './home-elements'
import { apiCurrentShop } from './utils'
import { Frame, Toast } from '@shopify/polaris'

const Home = () => {
  const [acceptsTerms, setAcceptsTerms] = useState(false)
  const [isAppEnabled, setIsAppEnabled] = useState(false)
  const [shopName, setShopName] = useState('')
  const [requestError, setRequestError] = useState(false)
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false)
  const [isTermsAndConditionsOpen, setIsTermsAndConditionsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const response = await apiCurrentShop()
      setIsLoading(false)
      if (response) {
        setIsAppEnabled(response['accepted_terms_and_conditions_at'])
        setShopName(response['name'])
      } else {
        setRequestError(true)
      }
    })()
  }, [setIsAppEnabled, setRequestError, setShopName])

  const toggleToast = useCallback(() => setRequestError(false), [setRequestError])

  return (
    <HomeWrapper>
      {isLoading ? (
        <SkeletonDisplayPage />
      ) : (
        <Frame>
          {requestError && (
            <>
              <Toast content="An error occurred" onDismiss={toggleToast} />
              <br />
            </>
          )}
          <ThankYou />
          <br />
          <Hero
            acceptsTerms={acceptsTerms}
            isAppEnabled={isAppEnabled}
            setIsAppEnabled={setIsAppEnabled}
            setRequestError={setRequestError}
            shopName={shopName}
          />
          <br />
          {!isAppEnabled && (
            <>
              <AcceptTerms
                acceptsTerms={acceptsTerms}
                setAcceptsTerms={setAcceptsTerms}
                setIsPrivacyPolicyOpen={setIsPrivacyPolicyOpen}
                setIsTermsAndConditionsOpen={setIsTermsAndConditionsOpen}
              />
              <br />
            </>
          )}
          <PrivacyPolicy active={isPrivacyPolicyOpen} setActive={setIsPrivacyPolicyOpen} />
          <br />
          <TermsAndConditions active={isTermsAndConditionsOpen} setActive={setIsTermsAndConditionsOpen} />
          <br />
          <Footer />
        </Frame>
      )}
    </HomeWrapper>
  )
}

export default Home
