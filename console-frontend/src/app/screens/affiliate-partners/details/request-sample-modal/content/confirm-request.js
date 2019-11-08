import React from 'react'
import styled from 'styled-components'
import { TextField, Typography } from '@material-ui/core'

const StyledTextField = styled(TextField)`
  align-self: center;
  width: 100%;
  margin-bottom: 16px;
  background-color: #e7ecef;
`

const ConfirmRequest = ({ message, setMessageValue }) => (
  <>
    <Typography variant="h4">{'Confirm your request'}</Typography>
    <Typography style={{ marginBottom: '20px' }} variant="body2">
      {
        'Please input information about the product you would like to receive. Your request will then be reviewed by the brand and they may get in touch with you about further steps or information.'
      }
    </Typography>
    <StyledTextField
      id="filled-textarea"
      multiline
      onChange={setMessageValue}
      placeholder={'https://example.com/products/example-product\nSize: M\nColor: Pink...'}
      rows="4"
      value={message}
      variant="outlined"
    />
  </>
)

export default ConfirmRequest
