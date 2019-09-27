import ClipboardInput from 'shared/clipboard-input'
import mixpanel from 'ext/mixpanel'
import React, { useCallback } from 'react'
import styled from 'styled-components'

const urlInputProps = { pattern: 'https?://.+' }

const Container = styled.div`
  background: #e7ecef;
  min-height: 100px;
  padding: 60px;
`

const ClipboardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Footer = ({ affiliation }) => {
  const mixFunction = useCallback(
    text => {
      return `${text}/?aftk=${affiliation.token}`
    },
    [affiliation.token]
  )

  const onCopyCustomLink = useCallback(text => {
    mixpanel.track('Copied Custom Link', { hostname: window.location.hostname, text })
  }, [])

  return (
    <Container>
      <ClipboardContainer>
        <ClipboardInput
          inputProps={urlInputProps}
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
