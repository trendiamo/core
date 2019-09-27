import Button from 'shared/button'
import React, { memo } from 'react'
import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'

const Container = styled.div`
  width: 100%;
  border: 2px dashed ${showUpToUsBranding() ? '#0f7173' : '#ff6f61'};
  ${showUpToUsBranding() ? 'padding: 50px 0;' : 'padding: 65px 0;border-radius: 8px;'}
  text-align: center;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AddItemContainer = ({ message, ...props }) => (
  <Container>
    <Button color="primaryGradient" variant="contained" {...props}>
      {message}
    </Button>
  </Container>
)

export default memo(AddItemContainer)
