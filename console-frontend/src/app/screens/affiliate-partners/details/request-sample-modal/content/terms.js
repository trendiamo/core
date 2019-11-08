import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Container = styled(({ children, ...props }) => (
  <div {...props}>
    <div>{children}</div>
  </div>
))`
  margin-top: 24px;

  > div {
    padding-top: 12px;
    border-top: 3px solid #e7ecef;
  }
`

const Text = styled(props => <Typography variant="body2" {...props} />)`
  font-size: 14px;
`

const Terms = () => (
  <Container>
    <Text>
      {
        'By clicking on „Confirm Order” you accept that your full name and your address will be shared with the brand to be able to send you the package.'
      }
    </Text>
  </Container>
)

export default Terms
