import React from 'react'
import styled from 'styled-components'

const SocialProof = styled(({ className }) => (
  <div className={className}>
    <h3>{'You are in good company'}</h3>
    <p>{'TODO: logos'}</p>
  </div>
))`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`

export default SocialProof
