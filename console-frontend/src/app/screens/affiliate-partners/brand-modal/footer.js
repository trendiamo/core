import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Checkbox, FormControlLabel, FormLabel, Typography } from '@material-ui/core'

const Container = styled.div`
  background: #e7ecef;
  min-height: 100px;
  padding: 25px 60px 40px;
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
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
`

const Details = styled.div`
  display: block;
  max-width: 70%;
`

const TermsAcceptanceContainer = styled.div`
  margin-top: 20px;
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
  const toggleAcceptance = useCallback(
    () => {
      setAcceptedTermsAndConditions(!acceptedTermsAndConditions)
    },
    [acceptedTermsAndConditions, setAcceptedTermsAndConditions]
  )

  const onCheckboxChange = useCallback(
    event => {
      setAcceptedTermsAndConditions(event.target.checked)
    },
    [setAcceptedTermsAndConditions]
  )

  const clickLabelLink = useCallback(
    event => {
      event.stopPropagation()
      scrollToTermsAndConditions()
    },
    [scrollToTermsAndConditions]
  )

  return (
    <TermsAcceptanceContainer>
      <FormControlLabel
        control={<Checkbox checked={acceptedTermsAndConditions} color="primary" onChange={onCheckboxChange} />}
        label={
          <FormLabel onClick={toggleAcceptance}>
            {'I have read and accepted the '}
            <LabelLink onClick={clickLabelLink}>{'Terms & Conditions'}</LabelLink>
            {' for promoting this brand.'}
          </FormLabel>
        }
      />
    </TermsAcceptanceContainer>
  )
}

const ButtonContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
`

const StyledClipboardInput = styled(ClipboardInput)`
  max-width: 450px;
  margin: 20px auto 19px;
`

const RemoveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const WarningMessage = styled(Typography)`
  max-width: 300px;
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

  useEffect(() => () => clearTimeout(removeWarningTimeoutRef.current), [])

  return (
    <Container>
      <Typography align="center" variant="overline">
        {'Your affiliate link'}
      </Typography>
      <StyledClipboardInput size="large" text={affiliationUrl} />
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

const Actions = ({ brand, onCreateLinkClick, scrollToTermsAndConditions }) => {
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false)

  return (
    <ActionsContainer>
      <Details>
        <Conditions>
          <CommissionRate>
            {Number(brand.commissionRate).toLocaleString(undefined, { style: 'percent' })}
          </CommissionRate>
          <CommissionDescription>{brand.commissionDescription}</CommissionDescription>
        </Conditions>
        <TermsAcceptanceBox
          acceptedTermsAndConditions={acceptedTermsAndConditions}
          scrollToTermsAndConditions={scrollToTermsAndConditions}
          setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
        />
      </Details>
      <ButtonContainer>
        <Button color="primaryGradient" disabled={!acceptedTermsAndConditions} onClick={onCreateLinkClick} size="large">
          {'Create Link'}
        </Button>
      </ButtonContainer>
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
      <Typography variant="overline">{'Affiliate terms'}</Typography>
      <Actions
        brand={brand}
        onCreateLinkClick={onCreateLinkClick}
        scrollToTermsAndConditions={scrollToTermsAndConditions}
      />
    </Container>
  )
}

export default Footer
