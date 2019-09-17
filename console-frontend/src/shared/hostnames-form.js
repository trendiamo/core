import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Button from 'shared/button'
import MuiCancel from '@material-ui/icons/Cancel'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Field, IconButton } from 'shared/form-elements'
import { FormControl, Typography } from '@material-ui/core'

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
  width: 100%;
`

const HostnameTextField = ({ index, onChange, value, ...props }) => {
  const editHostnameValue = useCallback(event => onChange(index, event.target.value), [index, onChange])

  return <Field {...props} onChange={editHostnameValue} value={value} />
}

const StyledHostnameTextField = styled(HostnameTextField)`
  flex: 1;
  margin: 8px 0;
`

const hostnamePattern =
  '((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])|(([0-9]{1,3}.){3}[0-9]{1,3}))(:[0-9]{4})?$'
const inputProps = { pattern: hostnamePattern }

const HostnameField = ({ allowDelete, editHostnameValue, index, isFormLoading, hostname, deleteHostname }) => {
  const newDeleteHostname = useCallback(() => !isFormLoading && deleteHostname(index), [
    isFormLoading,
    index,
    deleteHostname,
  ])

  return (
    <FlexDiv>
      <StyledHostnameTextField
        disabled={isFormLoading}
        index={index}
        inputProps={inputProps}
        label={index === 0 && 'Hostnames'}
        onChange={editHostnameValue}
        required
        value={hostname}
      />
      {allowDelete && (
        <IconButton onClick={newDeleteHostname}>
          <MuiCancel disabled={isFormLoading} />
        </IconButton>
      )}
    </FlexDiv>
  )
}

const HostnamesForm = ({
  addHostnameSelect,
  deleteHostname,
  editHostnameValue,
  form,
  fullWidth,
  isFormLoading,
  margin,
  required,
}) => (
  <FormControl fullWidth={fullWidth} margin={margin || 'normal'} required={required}>
    {form.hostnames.map((hostname, index) => (
      <HostnameField
        allowDelete={form.hostnames.length > 1}
        deleteHostname={deleteHostname}
        editHostnameValue={editHostnameValue}
        hostname={hostname}
        index={index}
        isFormLoading={isFormLoading}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    ))}
    <FlexDiv>
      <AddHostnameButton addHostnameSelect={addHostnameSelect} disabled={isFormLoading} />
    </FlexDiv>
  </FormControl>
)

export default HostnamesForm
