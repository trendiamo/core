import CircularProgress from 'shared/circular-progress'
import PluginPreview from './plugin-preview'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, Field, Form, Select } from 'shared/form-elements'
import { apiRequest, apiWebsiteSettingsShow, apiWebsiteSettingsUpdate, atLeastOneNonBlankCharInputProps } from 'utils'
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const formObjectTransformer = json => ({
  themeColor: json.themeColor || '',
  textColor: json.textColor || '',
  roundEdges: json.roundEdges || false,
})

const textColorOptions = ['White', 'Black']

const StyledGrid = styled(Grid)`
  flex: 1;
`

const WebsiteSettings = () => {
  const [websiteSettingsId, setWebsiteSettingsId] = useState(null)

  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    async form => {
      const { json, errors, requestError } = await apiRequest(apiWebsiteSettingsUpdate, [
        websiteSettingsId,
        { websiteSettings: form },
      ])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated website settings', { variant: 'success' })
      return json
    },
    [enqueueSnackbar, websiteSettingsId]
  )

  const loadFormObject = useCallback(async () => {
    const { json, requestError } = await apiRequest(apiWebsiteSettingsShow, [])
    if (requestError) {
      enqueueSnackbar(requestError, { variant: 'error' })
      return {}
    }
    setWebsiteSettingsId(json.id)
    return json
  }, [enqueueSnackbar])

  const { form, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, setFieldValue } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={onFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
        />
      ),
      title: 'Theme',
    }),
    [isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return (
    <StyledGrid container spacing={24}>
      <Grid item md={6} xs={12}>
        <Section title="Theme">
          <Form isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.roundEdges}
                  color="primary"
                  disabled={isFormLoading || isFormSubmitting}
                  name="roundEdges"
                  onChange={setFieldValue}
                />
              }
              disabled={isFormLoading || isFormSubmitting}
              label="Use round edges"
            />
            <Field
              disabled={isFormLoading || isFormSubmitting}
              fullWidth
              inputProps={atLeastOneNonBlankCharInputProps}
              label="Theme Color"
              margin="normal"
              name="themeColor"
              onChange={setFieldValue}
              required
              type="color"
              value={form.themeColor}
            />
            <Select
              disabled={isFormLoading || isFormSubmitting}
              fullWidth
              label="Text Color"
              margin="normal"
              name="textColor"
              onChange={setFieldValue}
              options={textColorOptions}
              required
              value={form.textColor}
            />
          </Form>
        </Section>
      </Grid>
      <Grid item md={6} xs={12}>
        <PluginPreview form={form} />
      </Grid>
    </StyledGrid>
  )
}

export default WebsiteSettings
