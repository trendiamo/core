import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { apiAffiliateLinkCreate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const urlInputProps = { pattern: 'https?://.+' }

const Container = styled.div`
  background: #e7ecef;
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  @media (min-height: 960px) {
    padding: 20px 60px 20px;
  }
`

const ClipboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  > :first-child {
    margin-bottom: 1rem;
  }
`

const StyledClipboardInput = styled(ClipboardInput)`
  width: 100%;
  > div:first-child {
    padding-left: 0;
    background-color: white;
  }
  input {
    padding: 6px;
  }
  > div,
  > div > div {
    height: 48px;
  }
`

const Footer = ({ affiliation }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState(false)
  const [isCustomLink, setIsCustomLink] = useState(false)

  const createAffiliateLink = useCallback(
    async text => {
      const { json, errors, requestError } = await apiRequest(apiAffiliateLinkCreate, [
        { affiliationId: affiliation.id, url: `${text}/?aftk=${affiliation.token}` },
      ])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        return
      }
      if (errors) {
        enqueueSnackbar(errors.message, { variant: 'error' })
        return
      }
      return json.url
    },
    [affiliation.id, affiliation.token, enqueueSnackbar]
  )

  const onCopyCustomLink = useCallback(
    text => {
      mixpanel.track('Copied Custom Link', {
        hostname: window.location.hostname,
        text,
        brandId: affiliation.brand.id,
        brand: affiliation.brand.name,
      })
    },
    [affiliation.brand.id, affiliation.brand.name]
  )

  const onCopyDefaultLink = useCallback(
    text => {
      mixpanel.track('Copied Default Link', {
        hostname: window.location.hostname,
        text,
        brandId: affiliation.brand.id,
        brand: affiliation.brand.name,
      })
    },
    [affiliation.brand.id, affiliation.brand.name]
  )

  const mixFunction = useCallback(
    async text => {
      setIsLoading(true)
      const result = await createAffiliateLink(text)
      setIsLoading(false)
      return result
    },
    [createAffiliateLink]
  )

  const onCancelClick = useCallback(() => setIsCustomLink(false), [])
  const onCustomClick = useCallback(() => setIsCustomLink(true), [])

  return (
    <Container>
      <ClipboardContainer>
        {isCustomLink ? (
          <>
            <ClipboardInput
              inputProps={urlInputProps}
              isLoading={isLoading}
              mixFunction={mixFunction}
              onCopy={onCopyCustomLink}
              pasteable
              placeholder="Paste link here..."
              size="large"
            />
            <Button color="whiteBg" onClick={onCancelClick} size="small">
              {'Get default link'}
            </Button>
          </>
        ) : (
          <>
            <StyledClipboardInput
              backgroundColor="#e7ecef"
              onCopy={onCopyDefaultLink}
              size="large"
              text={affiliation.defaultAffiliateLink}
            />
            <Button color="whiteBg" onClick={onCustomClick} size="small">
              {'Get custom link'}
            </Button>
          </>
        )}
      </ClipboardContainer>
    </Container>
  )
}

export default Footer
