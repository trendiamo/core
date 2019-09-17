import Button from 'shared/button'
import React, { useCallback, useState } from 'react'
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

const Footer = ({ brand, createAffiliation, handleClose, scrollToTermsAndConditions }) => {
  const onCreateLinkClick = useCallback(
    () => {
      createAffiliation(brand)
      handleClose()
    },
    [brand, createAffiliation, handleClose]
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
