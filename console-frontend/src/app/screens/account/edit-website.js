import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import auth from 'auth'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from 'shared/circular-progress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MuiCancel from '@material-ui/icons/Cancel'
import Notification from 'shared/notification'
import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withForm from 'ext/recompose/with-form'
import { apiWebsiteShow, apiWebsiteUpdate } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { extractErrors } from 'utils/shared'
import { Prompt } from 'react-router'

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
    <FormHelperText>{'Dangerous: this controls whether or not the plugin appears on your website'}</FormHelperText>
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
  withHandlers({
    loadFormObject: ({ websiteId }) => async () => {
      const json = await apiWebsiteShow(websiteId)
      return {
        hostnames: json.hostnames || [''],
        name: json.name || '',
      }
    },
    saveFormObject: ({ websiteId, setErrors }) => async form => {
      const response = await apiWebsiteUpdate(websiteId, { website: form })
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
