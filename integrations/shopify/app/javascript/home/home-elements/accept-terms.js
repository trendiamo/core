import React, { useCallback } from 'react'
import { Card, Checkbox, Layout, Link, Stack } from '@shopify/polaris'
import '@shopify/polaris/styles.css'

const AcceptTerms = ({ acceptsTerms, setAcceptsTerms, setIsTermsAndConditionsOpen, setIsPrivacyPolicyOpen }) => {
  const handleChange = useCallback(newChecked => setAcceptsTerms(newChecked), [setAcceptsTerms])

  const onPrivacyPolicyClick = useCallback(() => setIsPrivacyPolicyOpen(true), [setIsPrivacyPolicyOpen])
  const onTermsAndConditionsClick = useCallback(() => setIsTermsAndConditionsOpen(true), [setIsTermsAndConditionsOpen])

  return (
    <Layout>
      <Layout.Section>
        <Card sectioned title="Accept our Terms">
          <Stack>
            <Checkbox
              checked={acceptsTerms}
              label="I have read and agree to the Privacy Policy, Terms and Conditions and Affiliate Programme Terms & Conditions."
              labelHidden
              onChange={handleChange}
            />
            <p>
              {'I have read and agree to the '}
              <Link onClick={onPrivacyPolicyClick}>{'Privacy Policy'}</Link>
              {' , '}
              <Link onClick={onTermsAndConditionsClick}>{'Terms and Conditions'}</Link>
              {' and '}
              <Link external url="https://app.uptous.co/affiliate-programme-terms-and-conditions">
                {'Affiliate Programme Terms & Conditions'}
              </Link>
              {'.'}
            </p>
          </Stack>
        </Card>
      </Layout.Section>
    </Layout>
  )
}

export default AcceptTerms
