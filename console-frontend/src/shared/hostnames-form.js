import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Button from 'shared/button'
import MuiCancel from '@material-ui/icons/Cancel'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { IconButton, InputLabel, TextField, Typography } from '@material-ui/core'

const LabelContainer = styled.div`
  margin-top: 1rem;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

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

const HostnameTextField = ({ index, onChange, value, ...props }) => {
  const editHostnameValue = useCallback(event => onChange(index, event.target.value), [index, onChange])

  return <TextField {...props} onChange={editHostnameValue} value={value} />
}

const StyledHostnameTextField = styled(HostnameTextField)`
  flex: 1;
  margin: 8px 0;
`

const Cancel = ({ index, onClick, disabled, ...props }) => {
  const deleteHostname = useCallback(() => !disabled && onClick(index), [disabled, index, onClick])

  return <MuiCancel {...props} disabled={disabled} onClick={deleteHostname} />
}

const hostnamePattern =
  '((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])|(([0-9]{1,3}.){3}[0-9]{1,3}))(:[0-9]{4})?$'
const inputProps = { pattern: hostnamePattern }

const HostnamesForm = ({ form, addHostnameSelect, editHostnameValue, deleteHostname, isFormLoading }) => (
  <>
    <LabelContainer>
      <InputLabel required>{'Hostnames'}</InputLabel>
    </LabelContainer>
    {form.hostnames.map((hostname, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <FlexDiv key={index}>
        <StyledHostnameTextField
          disabled={isFormLoading}
          index={index}
          inputProps={inputProps}
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
