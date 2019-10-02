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
  justify-content: center;
  width: 100%;
`

const Footer = ({ affiliation }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState(false)

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

  const onCopyCustomLink = useCallback(text => {
    mixpanel.track('Copied Custom Link', { hostname: window.location.hostname, text })
  }, [])

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
      <ClipboardContainer>
        <ClipboardInput
          inputProps={urlInputProps}
          isLoading={isLoading}
          mixFunction={mixFunction}
          onCopy={onCopyCustomLink}
          pasteable
          placeholder="Paste link here..."
          size="large"
        />
      </ClipboardContainer>
    </Container>
  )
}

export default Footer
