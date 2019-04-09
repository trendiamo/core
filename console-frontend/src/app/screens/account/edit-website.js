import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import HostnamesForm from 'shared/hostnames-form'
import React from 'react'
import withForm from 'ext/recompose/with-form'
import { apiRequest, apiWebsiteShow, apiWebsiteUpdate, atLeastOneNonBlankCharRegexp } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps } from 'recompose'
import { Checkbox, FormControlLabel, FormHelperText, TextField } from '@material-ui/core'
import { Prompt } from 'react-router'
import { withSnackbar } from 'notistack'

const EditWebsite = ({
  addHostnameSelect,
  deleteHostname,
  isFormLoading,
  editHostnameValue,
  isFormPristine,
  form,
  onFormSubmit,
  setPreviewMode,
}) => (
  <form onSubmit={onFormSubmit}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
    <TextField
      disabled
      fullWidth
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
      label="Name"
      margin="normal"
      name="name"
      required
      value={form.name}
    />
    <FormControlLabel
      control={<Checkbox checked={!form.previewMode} color="primary" onChange={setPreviewMode} />}
      disabled={isFormLoading}
      label="Live"
    />
    <FormHelperText>{'Dangerous: this controls whether or not the plugin appears on your website.'}</FormHelperText>
    <HostnamesForm
      addHostnameSelect={addHostnameSelect}
      deleteHostname={deleteHostname}
      editHostnameValue={editHostnameValue}
      form={form}
      isFormLoading={isFormLoading}
    />
    <div style={{ marginTop: '1rem' }}>
      <Button
        color="primaryGradient"
        disabled={isFormLoading || isFormPristine}
        isFormPristine={isFormPristine}
        tooltipEnabled
        tooltipPlacement="right"
        tooltipText="No changes to save"
        type="submit"
        variant="contained"
      >
        {'Save'}
      </Button>
    </div>
  </form>
)

export default compose(
  withProps(() => ({
    websiteId: auth.isAdmin()
      ? auth.getAdminSessionAccount().websitesAttributes[0] && auth.getAdminSessionAccount().websitesAttributes[0].id
      : auth.getUser().account.websiteIds[0],
  })),
  withSnackbar,
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        hostnames: json.hostnames || [''],
        name: json.name || '',
        previewMode: json.previewMode,
      }
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, websiteId }) => async () => {
      const { json, requestError } = await apiRequest(apiWebsiteShow, [websiteId])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
    saveFormObject: ({ enqueueSnackbar, websiteId }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiWebsiteUpdate, [websiteId, { website: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) enqueueSnackbar('Successfully updated account info', { variant: 'success' })
      return json
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
