import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import HostnamesForm from 'shared/hostnames-form'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import useForm from 'ext/hooks/use-form'
import { apiRequest, apiWebsiteShow, apiWebsiteUpdate, atLeastOneNonBlankCharInputProps } from 'utils'
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import { FormHelperText } from 'shared/form-elements'
import { Prompt } from 'react-router'
import { useSnackbar } from 'notistack'

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

  const { form, isFormLoading, isFormPristine, isFormSubmitting, mergeForm, mergeFormCallback, onFormSubmit } = useForm(
    {
      formObjectTransformer,
      loadFormObject,
      saveFormObject,
    }
  )

  const addHostnameSelect = useCallback(
    () => {
      mergeFormCallback(form => ({ hostnames: [...form.hostnames, ''] }))
    },
    [mergeFormCallback]
  )

  const deleteHostname = useCallback(
    index => {
      mergeFormCallback(form => {
        let newHostnames = [...form.hostnames]
        newHostnames.splice(index, 1)
        return { hostnames: newHostnames }
      })
    },
    [mergeFormCallback]
  )

  const editHostnameValue = useCallback(
    (index, newValue) => {
      mergeFormCallback(form => {
        const newHostnames = [...form.hostnames]
        newHostnames[index] = newValue
        return { ...form, hostnames: newHostnames }
      })
    },
    [mergeFormCallback]
  )

  const setPreviewMode = useCallback(
    (event, checked) => {
      mergeForm({ previewMode: !checked })
    },
    [mergeForm]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title="Website">
      <form onSubmit={onFormSubmit}>
        <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
        <TextField
          disabled
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
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
    </Section>
  )
}

export default EditWebsite
