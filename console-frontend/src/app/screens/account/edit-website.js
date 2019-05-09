import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import HostnamesForm from 'shared/hostnames-form'
import React, { useCallback, useMemo } from 'react'
import useForm from 'ext/hooks/use-form'
import { apiRequest, apiWebsiteShow, apiWebsiteUpdate, atLeastOneNonBlankCharRegexp } from 'utils'
import { Checkbox, FormControlLabel, FormHelperText, TextField } from '@material-ui/core'
import { Prompt } from 'react-router'
import { useSnackbar } from 'notistack'

const defaultForm = {
  hostnames: [''],
  name: '',
  previewMode: false,
}

const formObjectTransformer = json => {
  return {
    hostnames: json.hostnames || [''],
    name: json.name || '',
    previewMode: json.previewMode,
  }
}

const EditWebsite = () => {
  const { enqueueSnackbar } = useSnackbar()

  const websiteId = useMemo(() => {
    return auth.isAdmin()
      ? auth.getAdminSessionAccount().websitesAttributes[0] && auth.getAdminSessionAccount().websitesAttributes[0].id
      : auth.getUser().account.websiteIds[0]
  }, [])

  const loadFormObject = useCallback(
    async () => {
      const { json, requestError } = await apiRequest(apiWebsiteShow, [websiteId])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
    [enqueueSnackbar, websiteId]
  )

  const saveFormObject = useCallback(
    async form => {
      const { json, errors, requestError } = await apiRequest(apiWebsiteUpdate, [websiteId, { website: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) enqueueSnackbar('Successfully updated account info', { variant: 'success' })
      return json
    },
    [enqueueSnackbar, websiteId]
  )

  const { form, isFormLoading, isFormPristine, isFormSubmitting, setForm, onFormSubmit } = useForm({
    formObjectTransformer,
    defaultForm,
    loadFormObject,
    saveFormObject,
  })

  const addHostnameSelect = useCallback(
    () => {
      setForm({ ...form, hostnames: [...form.hostnames, ''] })
    },
    [form, setForm]
  )

  const deleteHostname = useCallback(
    index => {
      let newHostnames = [...form.hostnames]
      newHostnames.splice(index, 1)
      setForm({ ...form, hostnames: newHostnames })
    },
    [form, setForm]
  )

  const editHostnameValue = useCallback(
    (index, newValue) => {
      const newHostnames = [...form.hostnames]
      newHostnames[index] = newValue
      setForm({ ...form, hostnames: newHostnames })
    },
    [form, setForm]
  )

  const setPreviewMode = useCallback(
    (event, checked) => {
      setForm({ ...form, previewMode: !checked })
    },
    [form, setForm]
  )

  if (isFormLoading) return <CircularProgress />

  return (
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
          disabled={isFormLoading || isFormPristine || isFormSubmitting}
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
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
}

export default EditWebsite
