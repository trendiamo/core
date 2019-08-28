import Button from 'shared/button'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Checkbox } from '@material-ui/core'

const Container = styled.div`
  background: #f4f8f8;
  min-height: 100px;
  padding: 25px 60px 40px;
`

const Title = styled.div`
  color: #8799a4;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
`

const CommissionValue = styled.div`
  color: #1b3b50;
  font-size: 32px;
  font-weight: 700;
`

const CommissionDescription = styled.div`
  margin-left: 10px;
  color: #8799a4;
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

const Label = styled.div`
  color: #1b3b50;
  font-size: 18px;
  display: inline-block;
  margin-left: 8px;
`

const TermsAcceptanceContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
`

const Link = styled.span`
  margin: 0 5px;
  cursor: pointer;
  text-decoration: underline;
`

const StyledCheckbox = styled(Checkbox)`
  padding: 0;
`

const TermsAcceptanceBox = ({
  setAcceptedTermsAndConditions,
  scrollToTermsAndConditions,
  acceptedTermsAndConditions,
}) => {
  const toggleAcceptance = useCallback(
    event => {
      setAcceptedTermsAndConditions(event.target.checked)
    },
    [setAcceptedTermsAndConditions]
  )

  return (
    <TermsAcceptanceContainer>
      <StyledCheckbox checked={acceptedTermsAndConditions} onChange={toggleAcceptance} />
      <Label>
        {'I have read and accepted the'}
        <Link onClick={scrollToTermsAndConditions}>{'Terms & Conditions'}</Link>
        {'for promoting this brand.'}
      </Label>
    </TermsAcceptanceContainer>
  )
}

const ButtonContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
`

const Actions = ({ brand, scrollToTermsAndConditions }) => {
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false)

  return (
    <ActionsContainer>
      <Details>
        <Conditions>
          <CommissionValue>{brand.commissionValue}</CommissionValue>
          <CommissionDescription>{brand.commissionDescription}</CommissionDescription>
        </Conditions>
        <TermsAcceptanceBox
          acceptedTermsAndConditions={acceptedTermsAndConditions}
          scrollToTermsAndConditions={scrollToTermsAndConditions}
          setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
        />
      </Details>
      <ButtonContainer>
        <Button color="primaryGradient" disabled={!acceptedTermsAndConditions}>
          {'Create Link'}
        </Button>
      </ButtonContainer>
    </ActionsContainer>
  )
}

const Footer = ({ brand, scrollToTermsAndConditions }) => {
  return (
    <Container>
      <Title>{'Affiliate terms'}</Title>
      <Actions brand={brand} scrollToTermsAndConditions={scrollToTermsAndConditions} />
    </Container>
  )
}

export default Footer
