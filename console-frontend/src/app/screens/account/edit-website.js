import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import HostnamesForm from 'shared/hostnames-form'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import { apiRequest, apiWebsiteShow, apiWebsiteUpdate, atLeastOneNonBlankCharInputProps } from 'utils'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Field, FormHelperText } from 'shared/form-elements'
import { Prompt } from 'react-router'
import { useSnackbar } from 'notistack'

const PreviewButtonsContainer = styled.div`
  margin-top: 14px;
  margin-bottom: 12px;
  & > a {
    margin-right: 1rem;
  }
`

const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  height: 16px;
  margin-left: 4px;
`

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
    return auth.getAccount().websitesAttributes[0].id
  }, [])

  const loadFormObject = useCallback(async () => {
    const { json, requestError } = await apiRequest(apiWebsiteShow, [websiteId])
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    return json
  }, [enqueueSnackbar, websiteId])

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

  const addHostnameSelect = useCallback(() => {
    mergeFormCallback(form => ({ hostnames: [...form.hostnames, ''] }))
  }, [mergeFormCallback])

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

  const toggleECommerce = useCallback(
    event => {
      mergeForm({ isECommerce: event.target.checked })
    },
    [mergeForm]
  )

  const toggleLiveMode = useCallback(
    event => {
      mergeForm({ previewMode: !event.target.checked })
    },
    [mergeForm]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title="Website">
      <form onSubmit={onFormSubmit}>
        <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
        <Field
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
          control={<Checkbox checked={!form.previewMode} color="primary" onChange={toggleLiveMode} />}
          disabled={isFormLoading}
          label="Live"
        />
        <FormHelperText>{'Dangerous: this controls whether or not the plugin appears on your website.'}</FormHelperText>
        {form.previewMode && (
          <>
            <PreviewButtonsContainer>
              <Button
                color="white"
                href={`http://${form.hostnames[0]}/#trnd:preview:1`}
                inline
                target="_blank"
                variant="contained"
              >
                {'Enable preview mode'}
                <StyledOpenInNewIcon />
              </Button>
              <Button
                color="white"
                href={`http://${form.hostnames[0]}/#trnd:preview:0`}
                inline
                target="_blank"
                variant="contained"
              >
                {'Disable preview mode'}
                <StyledOpenInNewIcon />
              </Button>
            </PreviewButtonsContainer>
            <FormHelperText>
              {
                'You can toggle preview mode so only you can see the plugin in your website. Please note that a trigger also needs to be in place.'
              }
            </FormHelperText>
          </>
        )}
        <FormControlLabel
          control={<Checkbox checked={form.isECommerce} color="primary" onChange={toggleECommerce} />}
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
