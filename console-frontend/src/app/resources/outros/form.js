import CircularProgress from 'shared/circular-progress'
import PluginPreviewFrame from 'shared/plugin-preview-frame'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Select from 'shared/select'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, Form } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
import { Outro } from 'plugin-base'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const PluginPreview = styled(({ className, persona }) => (
  <PluginPreviewFrame className={className}>
    <Outro persona={persona} />
  </PluginPreviewFrame>
))`
  border: 0;
  overflow: hidden;
  border-radius: 8px;
  width: 320px;
  height: 500px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
`

const OutroForm = ({
  formRef,
  form,
  setFieldValue,
  selectPersona,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  previewOutro,
  title,
}) => (
  <Section title={title}>
    <Grid container spacing={24}>
      <Grid item sm={6}>
        <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
          <TextField
            autoFocus
            disabled={isFormLoading}
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onChange={setFieldValue}
            required
            value={form.name}
          />
          <FormHelperText>{'The name is useful for you to reference this flow in a trigger.'}</FormHelperText>
          <Select
            autocomplete={apiPersonasAutocomplete}
            defaultValue={form.__persona && { value: form.__persona.id, label: form.__persona.name }}
            disabled={isFormLoading}
            label="Persona"
            onChange={selectPersona}
            placeholder="Choose a persona..."
            required
          />
          <FormHelperText>{'The persona will appear in the launcher, and in the content.'}</FormHelperText>
        </Form>
      </Grid>
      <Grid item sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
        <PluginPreview persona={previewOutro.persona} />
      </Grid>
    </Grid>
  </Section>
)

const emptyPreviewOutro = {
  persona: {
    name: '',
    profilePic: {
      url: '',
    },
  },
}

export default compose(
  withOnboardingHelp({ single: true, stepName: 'outros', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('previewOutro', 'setPreviewOutro', emptyPreviewOutro),
  withHandlers({
    convertPersona: () => persona => ({
      name: persona ? persona.name : '',
      profilePic: {
        url: persona ? persona.profilePicUrl : '',
      },
    }),
  }),
  withHandlers({
    loadFormObject: ({ convertPersona, loadFormObject, previewOutro, setPreviewOutro }) => async () => {
      const result = await loadFormObject()
      setPreviewOutro({
        ...previewOutro,
        persona: convertPersona(result.__persona),
      })
      return result
    },
    saveFormObject: ({ saveFormObject, setErrors }) => form => {
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    personaId: '',
    name: '',
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ convertPersona, form, previewOutro, setForm, setPreviewOutro }) => ({ value }) => {
      setForm({
        ...form,
        personaId: value.id,
      })
      setPreviewOutro({
        ...previewOutro,
        persona: convertPersona(value),
      })
    },
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.outrosList())
      return result
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ breadcrumbs, isFormLoading, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isFormLoading} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(OutroForm)
