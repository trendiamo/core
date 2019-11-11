import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { apiAffiliationCreate, apiRequest } from 'utils'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Title } from './shared'
import { useSnackbar } from 'notistack'

const StyledClipboardInput = styled(ClipboardInput)`
  height: 52px;
  margin-bottom: 10px;
`

const TermsAcceptanceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;

  label {
    color: #272932;
    font-size: 14px;
  }
`

const LabelLink = styled.a`
  color: #0f7173;
  text-decoration: underline;
`

const TermsAcceptanceBox = ({
  setAcceptedTermsAndConditions,
  scrollToTermsAndConditions,
  acceptedTermsAndConditions,
}) => {
  const clickLabelLink = useCallback(
    event => {
      event.preventDefault()
      scrollToTermsAndConditions()
    },
    [scrollToTermsAndConditions]
  )

  const toggleAcceptedTermsAndConditions = useCallback(() => {
    setAcceptedTermsAndConditions(!acceptedTermsAndConditions)
  }, [setAcceptedTermsAndConditions, acceptedTermsAndConditions])

  return (
    <TermsAcceptanceContainer>
      <FormControlLabel
        control={
          <Checkbox
            checked={acceptedTermsAndConditions}
            color="primary"
            onChange={toggleAcceptedTermsAndConditions}
            required
          />
        }
        label={
          <p>
            {'I have read and accepted the '}
            <LabelLink onClick={clickLabelLink}>{'Terms & Conditions'}</LabelLink>
            {' for promoting this brand.'}
          </p>
        }
      />
    </TermsAcceptanceContainer>
  )
}

const YourAffiliateLinks = ({
  affiliation,
  brand,
  fetchAffiliations,
  scrollToTermsAndConditions,
  setIsCustomLinkModalOpen,
}) => {
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false)
  const [isCreateLinkClicked, setIsCreateLinkClicked] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const createAffiliation = useCallback(
    brand => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiAffiliationCreate, [{ brandId: brand.id }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) {
          enqueueSnackbar(`Successfully created affiliation with ${brand.name}`, { variant: 'success' })
        }
        await fetchAffiliations()
        return { json, errors, requestError }
      })()
    },
    [enqueueSnackbar, fetchAffiliations]
  )

  const onCreateLinkClick = useCallback(async () => {
    setIsCreateLinkClicked(true)
    const { errors, requestError } = await createAffiliation(brand)
    if (!errors && !requestError) {
      setIsCreateLinkClicked(false)
      mixpanel.track('Created Affiliate Link', {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
      })
    }
  }, [brand, createAffiliation])

  const onCopyAffiliateLink = useCallback(
    text => {
      mixpanel.track('Copied Affiliate Link', {
        hostname: window.location.hostname,
        text,
        brandId: brand.id,
        brand: brand.name,
      })
    },
    [brand.id, brand.name]
  )

  const onCustomLinkClick = useCallback(() => {
    if (!brand) return
    setIsCustomLinkModalOpen(true)
    mixpanel.track('Clicked Custom Link', {
      hostname: window.location.hostname,
      brand: brand.name,
      brandId: brand.id,
    })
  }, [brand, setIsCustomLinkModalOpen])

  return (
    <Section>
      {affiliation && (
        <>
          <Title>{'Your Affiliate Links'}</Title>
          <StyledClipboardInput
            backgroundColor="#e7ecef"
            onCopy={onCopyAffiliateLink}
            size="large"
            text={affiliation.defaultAffiliateLink}
          />
        </>
      )}
      <Button
        color="primaryGradient"
        disabled={!affiliation && (isCreateLinkClicked || !acceptedTermsAndConditions)}
        flex
        fullWidthOnMobile
        isFormSubmitting={!affiliation && isCreateLinkClicked}
        onClick={affiliation ? onCustomLinkClick : onCreateLinkClick}
        size="large"
        width="100%"
        wrapText
      >
        {affiliation ? 'Custom Link' : 'Promote Now'}
      </Button>
      {!affiliation && (
        <TermsAcceptanceBox
          acceptedTermsAndConditions={acceptedTermsAndConditions}
          scrollToTermsAndConditions={scrollToTermsAndConditions}
          setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
        />
      )}
    </Section>
  )
}

export default YourAffiliateLinks
