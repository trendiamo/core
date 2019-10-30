import React, { useCallback, useEffect, useState } from 'react'
import { apiEnableApp } from '../../utils'
import { Button, Card, Heading, InlineError, Stack, TextStyle } from '@shopify/polaris'

const EnableUptous = ({ acceptsTerms, setIsAppEnabled, isAppEnabled, setRequestError }) => {
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [showInlineError, setShowInlineError] = useState(false)

  useEffect(() => {
    setIsButtonActive(acceptsTerms)
    if (showInlineError && acceptsTerms) setShowInlineError(false)
  }, [acceptsTerms, setShowInlineError, showInlineError])

  const onToggle = useCallback(async () => {
    if (acceptsTerms) {
      const response = await apiEnableApp()
      response && response['accepted_terms_and_conditions_at'] ? setIsAppEnabled(true) : setRequestError(true)
    } else {
      setShowInlineError(true)
    }
  }, [acceptsTerms, setShowInlineError, setIsAppEnabled, setRequestError])

  return (
    <>
      {showInlineError && <InlineError message="You need to accept UPTOUS Terms first." />}
      <Card>
        <Stack spacing="loose" vertical>
          {isAppEnabled ? (
            <Card.Section>
              <Heading element="h1">{'Enable the Affiliate Tracker'}</Heading>
              <br />
              <TextStyle variation="strong">{'The affiliate tracker '}</TextStyle>
              {'was successfully '}
              <TextStyle variation="positive">{'enabled '}</TextStyle>
              {'in your shop.'}
            </Card.Section>
          ) : (
            <Card.Section>
              <Heading element="h1">{'Enable the Affiliate Tracker'}</Heading>
              <br />
              <p>{'If you have already been onboarded please enable the app now!'}</p>
              <br />
              <Button onClick={onToggle} primary={isButtonActive}>
                {'Enable'}
              </Button>
            </Card.Section>
          )}
        </Stack>
      </Card>
    </>
  )
}

export default EnableUptous
