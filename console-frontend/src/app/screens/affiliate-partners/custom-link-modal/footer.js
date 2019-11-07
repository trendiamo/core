import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { apiAffiliateLinkCreate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const urlInputProps = { pattern: 'https?://.+' }

const Container = styled.div`
  background: #e7ecef;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-height: 960px) {
    padding: 30px 80px;
  }
`

const StyledClipboardInput = styled(ClipboardInput)`
  height: 52px;
  width: 100%;
`

const Footer = ({ affiliation }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const createAffiliateLink = useCallback(
    async text => {
      const { json, errors, requestError } = await apiRequest(apiAffiliateLinkCreate, [
        { affiliationId: affiliation.id, url: `${text}/?aftk=${affiliation.token}` },
      ])
      if (requestError || errors) {
        return enqueueSnackbar(requestError || errors.message, { variant: 'error' })
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

  const mixFunction = useCallback(
    async text => {
      setIsLoading(true)
      const result = await createAffiliateLink(text)
      setIsLoading(false)
      return result
    },
    [createAffiliateLink]
  )

  return (
    <Container>
      <StyledClipboardInput
        inputProps={urlInputProps}
        isLoading={isLoading}
        mixFunction={mixFunction}
        onCopy={onCopyCustomLink}
        pasteable
        placeholder="Paste link here..."
        size="large"
      />
    </Container>
  )
}

export default Footer
