import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PluginPreview from 'shared/plugin-preview'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, Form, Field as LimitedField } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
import { Outro } from 'plugin-base'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

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
  <Grid container spacing={24}>
    <Grid item md={6} xs={12}>
      <Section title={title}>
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
          <FormHelperText>{'The name is useful for you to reference this module in a trigger.'}</FormHelperText>
          <Autocomplete
            autocomplete={apiPersonasAutocomplete}
            defaultPlaceholder="Choose a persona"
            disabled={isFormLoading}
            fullWidth
            initialSelectedItem={form.__persona && { value: form.__persona, label: form.__persona.name }}
            label="Persona"
            onChange={selectPersona}
            options={{ suggestionItem: 'withAvatar' }}
            required
          />
          <FormHelperText>{'The persona will appear in the launcher, and in the content.'}</FormHelperText>
          <LimitedField
            disabled={isFormLoading}
            fullWidth
            label="Chat Bubble Text"
            margin="normal"
            max={characterLimits.main.chatBubble}
            name="chatBubbleText"
            onChange={setFieldValue}
            value={form.chatBubbleText}
          />
          <FormHelperText>{'Shows as a text bubble next to the plugin launcher.'}</FormHelperText>
        </Form>
      </Section>
    </Grid>
    <Grid item md={6} xs={12}>
      <PluginPreview persona={previewOutro.persona}>
        <Outro />
      </PluginPreview>
    </Grid>
  </Grid>
)

const emptyPreviewOutro = {
  persona: {
    name: '',
    profilePic: {
      url: '/img/icons/placeholder_avatar.png',
    },
    instagramUrl: '',
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
        url: persona ? persona.profilePicUrl : emptyPreviewOutro.persona.profilePic.url,
      },
      instagramUrl: persona ? persona.instagramUrl : null,
    }),
  }),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        id: json.id,
        personaId: (json.persona && json.persona.id) || '',
        name: json.name || '',
        chatBubbleText: json.chatBubbleText || '',
        __persona: json.persona,
      }
    },
    saveFormObject: ({ saveFormObject, setErrors }) => form => {
      return saveFormObject(form, { setErrors })
    },
    afterFormMount: ({ convertPersona, previewOutro, setPreviewOutro }) => formObject => {
      setPreviewOutro({
        ...previewOutro,
        persona: convertPersona(formObject.__persona),
      })
    },
  }),
  withForm({
    personaId: '',
    name: '',
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ convertPersona, form, previewOutro, setForm, setPreviewOutro }) => selected => {
      setForm({
        ...form,
        personaId: selected && selected.value.id,
      })
      selected &&
        setPreviewOutro({
          ...previewOutro,
          persona: convertPersona(selected.value),
        })
    },
    onFormSubmit: ({ location, formRef, history, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      setIsFormSubmitting(true)
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      if (location.pathname !== routes.outroEdit(result.id)) history.push(routes.outroEdit(result.id))
      setIsFormSubmitting(false)
      return result
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ breadcrumbs, isFormLoading, isFormSubmitting, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isFormSubmitting || isFormLoading} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(OutroForm)
