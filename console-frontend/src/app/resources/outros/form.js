import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PluginPreview from './plugin-preview'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useForm from 'ext/hooks/use-form'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { Actions, Field, Form, HelperText } from 'shared/form-elements'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharRegexp } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps } from 'recompose'
import { Grid } from '@material-ui/core'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const OutroForm = ({
  formRef,
  form,
  setFieldValue,
  selectPersona,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  title,
}) => (
  <Section title={title}>
    <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
      <Field
        autoFocus
        disabled={isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Name"
        margin="normal"
        name="name"
        onChange={setFieldValue}
        required
        value={form.name}
      />
      <HelperText>{'The name is useful for you to reference this module in a trigger.'}</HelperText>
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
      <HelperText>{'The persona will appear in the launcher, and in the content.'}</HelperText>
      <Field
        disabled={isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Chat Bubble Text"
        margin="normal"
        max={characterLimits.main.chatBubble}
        name="chatBubbleText"
        onChange={setFieldValue}
        required
        value={form.chatBubbleText}
      />
      <HelperText>{'Question on whether users are satisfied with the help they got.'}</HelperText>
      <Field
        disabled={isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Chat Bubble 'YES' Button"
        margin="normal"
        max={characterLimits.main.chatBubbleButton}
        name="chatBubbleButtonYes"
        onChange={setFieldValue}
        required
        value={form.chatBubbleButtonYes}
      />
      <HelperText>{'Button that indicates a positive user response.'}</HelperText>
      <Field
        disabled={isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Chat Bubble 'NO' Button"
        margin="normal"
        max={characterLimits.main.chatBubbleButton}
        name="chatBubbleButtonNo"
        onChange={setFieldValue}
        required
        value={form.chatBubbleButtonNo}
      />
      <HelperText>{'Button that indicates a negative user response.'}</HelperText>
    </Form>
  </Section>
)

const OutroForm1 = props => (
  <Grid container spacing={24}>
    <Grid item md={6} xs={12}>
      <OutroForm {...props} />
    </Grid>
    <Grid item md={6} xs={12}>
      <PluginPreview {...props} />
    </Grid>
  </Grid>
)

const OutroForm2 = compose(
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => selected => {
      selected &&
        setForm({
          ...form,
          personaId: selected.value.id,
          personaProfilePic: selected.value.profilePicUrl,
        })
    },
    onFormSubmit: ({ location, formRef, history, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      if (location.pathname !== routes.outroEdit(result.id)) history.push(routes.outroEdit(result.id))
      setIsFormSubmitting(false)
      return result
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ backRoute, title, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit }) => ({
    Actions: (
      <Actions
        isFormPristine={isFormPristine}
        isFormSubmitting={isFormSubmitting}
        onFormSubmit={onFormSubmit}
        saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
        tooltipEnabled
        tooltipText="No changes to save"
      />
    ),
    backRoute,
    title,
  }))
)(OutroForm1)

const OutroForm3 = props => {
  const defaultForm = {
    personaId: '',
    name: '',
  }
  const formProps = useForm({ ...props, defaultForm })
  return <OutroForm2 {...{ ...props, ...formProps }} />
}

export default compose(
  withOnboardingHelp({ single: true, stepName: 'outros', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
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
  })
)(OutroForm3)
