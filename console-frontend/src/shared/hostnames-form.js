import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Button from 'shared/button'
import MuiCancel from '@material-ui/icons/Cancel'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { IconButton, InputLabel, TextField, Typography } from '@material-ui/core'

const LabelContainer = styled.div`
  margin-top: 1rem;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const hostnamePattern =
  '(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])'

const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const AddHostnameButton = ({ disabled, addHostnameSelect }) => (
  <Button disabled={disabled} onClick={addHostnameSelect} size="small">
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Another Hostname'}</StyledTypography>
  </Button>
)

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const HostnameTextField = compose(
  withHandlers({
    editHostnameValue: ({ index, onChange }) => event => {
      onChange(index, event.target.value)
    },
  })
)(({ editHostnameValue, value, ...props }) => <TextField {...props} onChange={editHostnameValue} value={value} />)

const StyledHostnameTextField = styled(HostnameTextField)`
  flex: 1;
  margin: 8px 0;
`

const Cancel = compose(
  withHandlers({
    deleteHostname: ({ index, onClick, disabled }) => () => {
      if (!disabled) onClick(index)
    },
  })
)(({ deleteHostname, ...props }) => <MuiCancel {...props} onClick={deleteHostname} />)

const HostnamesForm = ({ form, addHostnameSelect, editHostnameValue, deleteHostname, isFormLoading }) => (
  <>
    <LabelContainer>
      <InputLabel>{'Hostnames'}</InputLabel>
    </LabelContainer>
    {form.hostnames.map((hostname, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <FlexDiv key={index}>
        <StyledHostnameTextField
          disabled={isFormLoading}
          index={index}
          inputProps={{ pattern: hostnamePattern }}
          onChange={editHostnameValue}
          required
          value={hostname}
        />
        {form.hostnames.length > 1 && (
          <IconButton>
            <Cancel disabled={isFormLoading} index={index} onClick={deleteHostname} />
          </IconButton>
        )}
      </FlexDiv>
    ))}
    <AddHostnameButton addHostnameSelect={addHostnameSelect} disabled={isFormLoading} />
  </>
)

export default HostnamesForm
