import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import auth from 'auth'
import CircularProgress from 'shared/circular-progress'
import MuiCancel from '@material-ui/icons/Cancel'
import Notification from 'shared/notification'
import React from 'react'
import styled from 'styled-components'
import withForm from 'ext/recompose/with-form'
import { apiRequest, apiWebsiteShow, apiWebsiteUpdate } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from '@material-ui/core'
import { extractErrors } from 'utils/shared'
import { Prompt } from 'react-router'
import { withSnackbar } from 'notistack'

const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const AddHostnameButton = ({ disabled, addHostnameSelect }) => (
  <Button disabled={disabled} onClick={addHostnameSelect} size="small">
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Another Hostname'}</StyledTypography>
  </Button>
)

const HostnameTextField = compose(
  withHandlers({
    editHostnameValue: ({ index, onChange }) => event => {
      onChange(index, event.target.value)
    },
  })
)(({ editHostnameValue, value, ...props }) => <TextField {...props} onChange={editHostnameValue} value={value} />)

const Cancel = compose(
  withHandlers({
    deleteHostname: ({ index, onClick, disabled }) => () => {
      if (!disabled) onClick(index)
    },
  })
)(({ deleteHostname, ...props }) => <MuiCancel {...props} onClick={deleteHostname} />)

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const StyledHostnameTextField = styled(HostnameTextField)`
  flex: 1;
  margin: 8px 0;
`

const LabelContainer = styled.div`
  margin-top: 1rem;
`

const EditWebsite = ({
  addHostnameSelect,
  deleteHostname,
  isFormLoading,
  editHostnameValue,
  errors,
  isFormPristine,
  form,
  onFormSubmit,
  setFieldValue,
  setPreviewMode,
}) => (
  <form onSubmit={onFormSubmit}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
    <Notification data={errors} />
    <TextField
      disabled={isFormLoading}
      fullWidth
      label="Name"
      margin="normal"
      name="name"
      onChange={setFieldValue}
      required
      value={form.name}
    />
    <FormControlLabel
      control={<Checkbox checked={!form.previewMode} onChange={setPreviewMode} />}
      disabled={isFormLoading}
      label="Live"
    />
    <FormHelperText>{'Dangerous: this controls whether or not the plugin appears on your website.'}</FormHelperText>
    <LabelContainer>
      <InputLabel>{'Hostnames'}</InputLabel>
    </LabelContainer>
    {form.hostnames.map((hostname, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <FlexDiv key={index}>
        <StyledHostnameTextField
          disabled={isFormLoading}
          index={index}
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
    <div style={{ marginTop: '1rem' }}>
      <Button color="primary" disabled={isFormLoading} type="submit" variant="contained">
        {'Save'}
      </Button>
    </div>
  </form>
)

export default compose(
  withState('errors', 'setErrors', null),
  withProps(() => ({
    websiteId: auth.getUser().account.websiteIds[0],
  })),
  withSnackbar,
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, websiteId }) => async () => {
      const json = await apiRequest(apiWebsiteShow, [websiteId], {
        enqueueSnackbar,
      })
      return {
        hostnames: json.hostnames || [''],
        name: json.name || '',
      }
    },
    saveFormObject: ({ enqueueSnackbar, websiteId, setErrors }) => async form => {
      const response = await apiRequest(apiWebsiteUpdate, [websiteId, { website: form }], {
        enqueueSnackbar,
        successMessage: 'Successfully Updated Account Info',
        successVariant: 'success',
      })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withForm({
    hostnames: [''],
    name: '',
    previewMode: false,
  }),
  withHandlers({
    addHostnameSelect: ({ form, setForm }) => () => {
      setForm({ ...form, hostnames: [...form.hostnames, ''] })
    },
    deleteHostname: ({ form, setForm }) => index => {
      let newHostnames = [...form.hostnames]
      newHostnames.splice(index, 1)
      setForm({ ...form, hostnames: newHostnames })
    },
    editHostnameValue: ({ form, setForm }) => (index, newValue) => {
      const newHostnames = [...form.hostnames]
      newHostnames[index] = newValue
      setForm({ ...form, hostnames: newHostnames })
    },
  }),
  withHandlers({
    setPreviewMode: ({ form, setForm }) => (event, checked) => {
      setForm({ ...form, previewMode: !checked })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(EditWebsite)
