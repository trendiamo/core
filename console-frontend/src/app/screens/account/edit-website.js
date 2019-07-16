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
    isECommerce: json.isECommerce,
  }
}

const EditWebsite = () => {
  const { enqueueSnackbar } = useSnackbar()

  const websiteId = useMemo(() => {
    return auth.getSessionAccount().websitesAttributes[0].id
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
        const newHostnames = [...form.hostnames]
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

  const toggleCheckbox = useCallback(
    formFieldName => event => {
      mergeForm({ [formFieldName]: event.target.checked })
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
          control={<Checkbox checked={form.previewMode} color="primary" onChange={toggleCheckbox('previewMode')} />}
          disabled={isFormLoading}
          label="Live"
        />
        <FormHelperText>{'Dangerous: this controls whether or not the plugin appears on your website.'}</FormHelperText>
        <FormControlLabel
          control={<Checkbox checked={form.isECommerce} color="primary" onChange={toggleCheckbox('isECommerce')} />}
          disabled={isFormLoading}
          label="E-Commerce"
        />
        <FormHelperText>{'Controls whether or not the data from your sales funnel is processed.'}</FormHelperText>
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
