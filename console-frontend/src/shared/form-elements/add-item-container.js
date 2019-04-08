import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { compose, onlyUpdateForKeys } from 'recompose'

const Container = styled.div`
  width: 100%;
  border: 2px dashed #ff6f61;
  border-radius: 8px;
  padding: 65px 0;
  text-align: center;
  margin: 20px 0;
`

const AddItemContainer = ({ message, ...props }) => (
  <Container>
    <Button color="primary" variant="contained" {...props}>
      {message}
    </Button>
  </Container>
)

export default compose(onlyUpdateForKeys(['message', 'disabled']))(AddItemContainer)
