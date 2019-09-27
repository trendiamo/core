import React from 'react'
import styled from 'styled-components'
import { ReactComponent as SelectIcon } from 'assets/icons/select.svg'
import { showUpToUsBranding } from 'utils'

const CheckCircleContainer = styled.div`
  width: 24px;
  height: 24px;
  background: ${showUpToUsBranding() ? '#0f7173' : 'linear-gradient(90deg, #FF6F61, #FE5442)'};
  border-radius: 50%;
  padding: 1px;
`

const CheckCircle = props => (
  <CheckCircleContainer {...props}>
    <SelectIcon />
  </CheckCircleContainer>
)

export default CheckCircle
