import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, Form, Field as LimitedField } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormHelperText, TextField } from '@material-ui/core'
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
  title,
}) => (
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
        required
        value={form.chatBubbleText}
      />
      <FormHelperText>{'Question on whether users are satisfied with the help they got.'}</FormHelperText>
      <LimitedField
        disabled={isFormLoading}
        fullWidth
        label="Chat Bubble 'YES' Button"
        margin="normal"
        max={characterLimits.main.chatBubbleButton}
        name="chatBubbleButtonYes"
        onChange={setFieldValue}
        required
        value={form.chatBubbleButtonYes}
      />
      <FormHelperText>{'Button that indicates a positive user response.'}</FormHelperText>
      <LimitedField
        disabled={isFormLoading}
        fullWidth
        label="Chat Bubble 'NO' Button"
        margin="normal"
        max={characterLimits.main.chatBubbleButton}
        name="chatBubbleButtonNo"
        onChange={setFieldValue}
        required
        value={form.chatBubbleButtonNo}
      />
      <FormHelperText>{'Button that indicates a negative user response.'}</FormHelperText>
    </Form>
  </Section>
)

export default compose(
  withOnboardingHelp({ single: true, stepName: 'outros', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        id: json.id,
        personaId: (json.persona && json.persona.id) || '',
        name: json.name || '',
        chatBubbleText: json.chatBubbleText || '',
        chatBubbleButtonYes: json.chatBubbleButtonYes || '',
        chatBubbleButtonNo: json.chatBubbleButtonNo || '',
        __persona: json.persona,
      }
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
    selectPersona: ({ form, setForm }) => selected => {
      selected &&
        setForm({
          ...form,
          personaId: selected.value.id,
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
  withAppBarContent(({ backRoute, title, isFormLoading, isFormSubmitting, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isFormSubmitting || isFormLoading} />,
    backRoute,
    title,
  }))
)(OutroForm)
