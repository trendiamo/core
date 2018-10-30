import { LogotypeContainer } from 'app/screens/shared'
import React from 'react'

const Logotype = ({ ...props }) => (
  <LogotypeContainer>
    <img alt="" src="/img/trendiamo-logo.svg" {...props} />
  </LogotypeContainer>
)

export default Logotype
