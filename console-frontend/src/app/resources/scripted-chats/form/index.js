import ChatStep from './chat-step'
import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Select from 'shared/select'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import withScriptedChatsForm from './with-scripted-chats-form'
import { Actions, Form } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, createSink, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
import { isEqual } from 'lodash'
import { OptionWithAvatar } from 'shared/select-option'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const Sink = createSink(({ newChatSteps, destinationChatStepsRefs, setDestinationChatStepRefs }) => {
  const newDestinationChatStepRefs = newChatSteps.map(e => e.__ref)
  if (isEqual(newDestinationChatStepRefs, destinationChatStepsRefs)) return
  setDestinationChatStepRefs(newDestinationChatStepRefs)
})

const DestinationChatSteps = compose(withScriptedChatsForm.consumer)(
  ({ destinationChatStepsRefs, newChatSteps, persistedChatSteps, setDestinationChatStepRefs }) => (
    <React.Fragment>
      <Sink
        destinationChatStepsRefs={destinationChatStepsRefs}
        newChatSteps={newChatSteps}
        setDestinationChatStepRefs={setDestinationChatStepRefs}
      />
      {persistedChatSteps.slice(1).map((persistedChatStep, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} ref={persistedChatStep.__ref} style={{ marginTop: '10px' }} />
      ))}
      {newChatSteps.map((newChatStep, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} ref={newChatStep.__ref} style={{ marginTop: '10px' }} />
      ))}
    </React.Fragment>
  )
)

const ScriptedChatForm = ({
  destinationChatStepsRefs,
  errors,
  form,
  formRef,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  selectPersona,
  setDestinationChatStepRefs,
  setChatStepForm,
  setFieldValue,
  title,
}) => (
  <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
    <Section title={title}>
      <Grid item sm={6}>
        <TextField
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
        <Select
          autocomplete={apiPersonasAutocomplete}
          components={{ Option: OptionWithAvatar }}
          defaultValue={form.__persona && { value: form.__persona.id, label: form.__persona.name }}
          disabled={isFormLoading}
          label="Persona"
          onChange={selectPersona}
          placeholder="Choose a persona..."
          required
        />
        <FormHelperText>{'The persona that will appear for this chat.'}</FormHelperText>
        <TextField
          disabled={isFormLoading}
          fullWidth
          label="Title"
          margin="normal"
          name="title"
          onChange={setFieldValue}
          required
          value={form.title}
        />
        <FormHelperText>{'The title will appear at the top of the chat.'}</FormHelperText>
        <TextField
          disabled={isFormLoading}
          fullWidth
          label="Chat Bubble Text"
          margin="normal"
          name="chatBubbleText"
          onChange={setFieldValue}
          value={form.chatBubbleText}
        />
        <FormHelperText>{'Shows as a text bubble next to the plugin launcher.'}</FormHelperText>
      </Grid>
    </Section>
    {form.chatStepAttributes && <ChatStep chatStep={form.chatStepAttributes} index={0} onChange={setChatStepForm} />}
    <DestinationChatSteps
      destinationChatStepsRefs={destinationChatStepsRefs}
      setDestinationChatStepRefs={setDestinationChatStepRefs}
    />
  </Form>
)

export default compose(
  withOnboardingHelp({ single: true, stepName: 'scriptedChats', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('destinationChatStepsRefs', 'setDestinationChatStepRefs', []),
  withState('errors', 'setErrors', null),
  withHandlers({
    saveFormObject: ({ saveFormObject, setErrors }) => form => {
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    name: '',
    title: '',
    personaId: '',
    chatStepAttributes: {
      chatMessagesAttributes: [
        {
          text: '',
        },
      ],
    },
  }),
  withScriptedChatsForm.provider,
  withHandlers({
    setChatStepForm: ({ form, setForm }) => chatStep => {
      setForm({ ...form, chatStepAttributes: chatStep })
    },
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => ({ value }) => {
      setForm({
        ...form,
        personaId: value.id,
      })
    },
    onFormSubmit: ({ location, formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return
      if (location.pathname !== routes.scriptedChatEdit(result.id)) {
        history.push(routes.scriptedChatEdit(result.id))
      }
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
)(ScriptedChatForm)
