import ClipboardInput from 'shared/clipboard-input'
import React, { useCallback } from 'react'
import styled from 'styled-components'

const urlInputProps = { pattern: 'https?://.+' }

const Container = styled.div`
  background: #e7ecef;
  min-height: 100px;
  padding: 25px 60px 40px;
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

  return (
    <Container>
      <ClipboardContainer>
        <ClipboardInput
          mixFunction={mixFunction}
          pasteable
          placeholder="Paste link here..."
          size="large"
          urlInputProps={urlInputProps}
        />
      </ClipboardContainer>
    </Container>
  )
}

export default Footer
