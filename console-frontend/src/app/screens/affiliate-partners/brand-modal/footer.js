import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Checkbox } from 'shared/form-elements'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  background: #e7ecef;
  min-height: 100px;
  padding: 20px 60px 20px;
`

const CommissionRate = styled.div`
  color: #0f7173;
  font-size: 32px;
  font-weight: 700;
`

const CommissionDescription = styled.div`
  margin-left: 10px;
  color: #0f7173;
`

const Conditions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Details = styled.div`
  width: 100%;
`

const TermsAcceptanceContainer = styled.div`
  display: flex;
  align-items: flex-start;
`

const LabelLink = styled.a`
  text-decoration: underline;
`

const TermsAcceptanceBox = ({
  setAcceptedTermsAndConditions,
  scrollToTermsAndConditions,
  acceptedTermsAndConditions,
}) => {
  const clickLabelLink = useCallback(
    event => {
      event.stopPropagation()
      scrollToTermsAndConditions()
    },
    [scrollToTermsAndConditions]
  )

  return (
    <TermsAcceptanceContainer>
      <Checkbox
        label={
          <>
            {'I have read and accepted the '}
            <LabelLink onClick={clickLabelLink}>{'Terms & Conditions'}</LabelLink>
            {' for promoting this brand.'}
          </>
        }
        setValue={setAcceptedTermsAndConditions}
        value={acceptedTermsAndConditions}
      />
    </TermsAcceptanceContainer>
  )
}

const StyledClipboardInput = styled(ClipboardInput)`
  max-width: 450px;
  margin: 20px auto 19px;
`

const RemoveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const WarningMessage = styled(Typography)`
  max-width: 300px;
`

const CreateAffiliateLinkContainer = styled.div`
  display: flex;
  justify-content: center;
`

const AffiliateTerms = styled.div`
  display: flex;
  align-items: baseline;
`

const SuccessScreen = ({ selectedAffiliation, brand, removeAffiliation, isLoading }) => {
  const [showRemoveConfirmationAlert, setShowRemoveConfirmationAlert] = useState(false)
  const removeWarningTimeoutRef = useRef(null)

  const affiliationUrl = useMemo(
    () => selectedAffiliation && `https://${brand.websiteHostname}/?aftk=${selectedAffiliation.token}`,
    [selectedAffiliation, brand.websiteHostname]
  )

  const onRemoveButtonClick = useCallback(
    () => {
      if (showRemoveConfirmationAlert) {
        removeAffiliation()
        return
      }
      setShowRemoveConfirmationAlert(true)
      removeWarningTimeoutRef.current = setTimeout(() => {
        setShowRemoveConfirmationAlert(false)
      }, 3000)
    },
    [removeAffiliation, showRemoveConfirmationAlert]
  )

  const onCopyAffiliateLink = useCallback(text => {
    mixpanel.track('Copied Affiliate Link', { hostname: window.location.hostname, text })
  }, [])

  useEffect(() => () => clearTimeout(removeWarningTimeoutRef.current), [])

  return (
    <Container>
      <Typography align="center" variant="overline">
        {'Your affiliate link'}
      </Typography>
      <StyledClipboardInput onCopy={onCopyAffiliateLink} size="large" text={affiliationUrl} />
      <RemoveButtonContainer>
        {showRemoveConfirmationAlert && (
          <>
            <WarningMessage variant="body2">
              {'Your link will not be recoverable after the removal of the affiliation! Are you sure?'}
            </WarningMessage>
          </>
        )}
        <Button
          color={showRemoveConfirmationAlert ? 'error' : 'primaryGradient'}
          disabled={isLoading || selectedAffiliation.hasRevenues}
          isFormSubmitting={isLoading}
          onClick={onRemoveButtonClick}
          size="small"
        >
          {showRemoveConfirmationAlert ? "I'm sure!" : 'Remove affiliation'}
        </Button>
      </RemoveButtonContainer>
    </Container>
  )
}

const Actions = ({ onCreateLinkClick, scrollToTermsAndConditions }) => {
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false)

  return (
    <ActionsContainer>
      <Details>
        <Conditions>
          <TermsAcceptanceBox
            acceptedTermsAndConditions={acceptedTermsAndConditions}
            scrollToTermsAndConditions={scrollToTermsAndConditions}
            setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
          />
        </Conditions>
        <CreateAffiliateLinkContainer>
          <Button
            color="primaryGradient"
            disabled={!acceptedTermsAndConditions}
            onClick={onCreateLinkClick}
            size="large"
          >
            {'Create Affiliate Link'}
          </Button>
        </CreateAffiliateLinkContainer>
      </Details>
    </ActionsContainer>
  )
}

const Footer = ({
  brand,
  createAffiliation,
  scrollToTermsAndConditions,
  removeAffiliation,
  selectedAffiliation,
  isLoading,
}) => {
  const onCreateLinkClick = useCallback(
    () => {
      mixpanel.track('Created Affiliate Link', { hostname: window.location.hostname, brand: brand.name })
      createAffiliation(brand)
    },
    [brand, createAffiliation]
  )

  if (selectedAffiliation)
    return (
      <SuccessScreen
        brand={brand}
        isLoading={isLoading}
        removeAffiliation={removeAffiliation}
        selectedAffiliation={selectedAffiliation}
      />
    )

  return (
    <Container>
      <Typography variant="overline">{'Affiliate terms: '}</Typography>
      <AffiliateTerms>
        <CommissionRate>{Number(brand.commissionRate).toLocaleString(undefined, { style: 'percent' })}</CommissionRate>
        <CommissionDescription>{brand.commissionDescription}</CommissionDescription>
      </AffiliateTerms>
      <Actions
        brand={brand}
        onCreateLinkClick={onCreateLinkClick}
        scrollToTermsAndConditions={scrollToTermsAndConditions}
      />
    </Container>
  )
}

export default Footer
