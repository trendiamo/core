import Button from 'shared/button'
import mixpanel from 'ext/mixpanel'
import React, { useCallback } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { Text } from './shared'

const StyledText = styled(Text)`
  margin-top: 10px;
  font-size: 14px;
`

const RequestSample = ({ brand, setIsRequestSampleModalOpen }) => {
  const onRequestSampleClick = useCallback(
    () => {
      if (!brand) return
      setIsRequestSampleModalOpen(true)
      mixpanel.track('Clicked Request Sample', {
        hostname: window.location.hostname,
        brand: brand.name,
        brandId: brand.id,
      })
    },
    [brand, setIsRequestSampleModalOpen]
  )

  return (
    <Section>
      <Button color="white" flex fullWidthOnMobile onClick={onRequestSampleClick} size="large" width="100%">
        {'Request sample'}
      </Button>
      <StyledText>
        {'Here you can apply for a free sample. The brand will review your request and get in touch with you.'}
      </StyledText>
    </Section>
  )
}

export default RequestSample
