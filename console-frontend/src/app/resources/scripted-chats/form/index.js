import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import ChatStep from './chat-step'
import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import withScriptedChatsForm from './with-scripted-chats-form'
import { Actions, Form, Field as LimitedField } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, createSink, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
import { isEqual } from 'lodash'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const Sink = createSink(({ newChatSteps, destinationChatStepsRefs, setDestinationChatStepRefs }) => {
  const newDestinationChatStepRefs = newChatSteps.map(e => e.__ref)
  if (isEqual(newDestinationChatStepRefs, destinationChatStepsRefs)) return
  setDestinationChatStepRefs(newDestinationChatStepRefs)
})

const NewChatSteps = compose(
  lifecycle({
    componentDidUpdate() {
      const { scrollToStep, newChatSteps } = this.props
      if (
        newChatSteps.length > 0 &&
        newChatSteps[newChatSteps.length - 1].__ref.current &&
        newChatSteps[newChatSteps.length - 1].__ref.current.hasChildNodes()
      )
        scrollToStep(newChatSteps[newChatSteps.length - 1])
    },
  })
)(({ newChatSteps }) => (
  <React.Fragment>
    {newChatSteps.map((newChatStep, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index} ref={newChatStep.__ref} style={{ marginTop: '10px' }} />
    ))}
  </React.Fragment>
))

const DestinationChatSteps = compose(withScriptedChatsForm.consumer)(
  ({ scrollToStep, destinationChatStepsRefs, newChatSteps, persistedChatSteps, setDestinationChatStepRefs }) => (
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
      <NewChatSteps newChatSteps={newChatSteps} scrollToStep={scrollToStep} />
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
  chatStepFoldHandlers,
  setChatStepFoldHandlers,
  title,
  scrollToStep,
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
        <FormHelperText>{'The persona that will appear for this chat.'}</FormHelperText>
        <LimitedField
          disabled={isFormLoading}
          fullWidth
          label="Title"
          margin="normal"
          max={characterLimits.main.title}
          name="title"
          onChange={setFieldValue}
          required
          value={form.title}
        />
        <FormHelperText>{'The title will appear at the top of the chat.'}</FormHelperText>
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
      </Grid>
    </Section>
    {form.chatStepAttributes && (
      <ChatStep
        chatStep={form.chatStepAttributes}
        chatStepFoldHandlers={chatStepFoldHandlers}
        index={0}
        onChange={setChatStepForm}
        scrollToStep={scrollToStep}
        setChatStepFoldHandlers={setChatStepFoldHandlers}
      />
    )}
    <DestinationChatSteps
      destinationChatStepsRefs={destinationChatStepsRefs}
      scrollToStep={scrollToStep}
      setDestinationChatStepRefs={setDestinationChatStepRefs}
    />
  </Form>
)

const newEmptyChatMessage = () => ({ text: '' })

const treatChatSteps = (chatStep, ids, extraIndex = 0) => ({
  id: chatStep.id,
  chatMessagesAttributes: chatStep.chatMessagesAttributes || [newEmptyChatMessage()],
  chatOptionsAttributes:
    chatStep.chatOptionsAttributes &&
    chatStep.chatOptionsAttributes.map((chatOptionAttributes, i) =>
      chatOptionAttributes.destinationChatStepAttributes
        ? {
            ...chatOptionAttributes,
            destinationChatStepAttributes: treatChatSteps(
              chatOptionAttributes.destinationChatStepAttributes,
              {
                ...ids,
                [chatStep.id]: true,
              },
              i
            ),
          }
        : chatOptionAttributes
    ),
  __index: Object.keys(ids).length + extraIndex,
  __ref: React.createRef(),
})

export default compose(
  withOnboardingHelp({ single: true, stepName: 'scriptedChats', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('destinationChatStepsRefs', 'setDestinationChatStepRefs', []),
  withState('chatStepFoldHandlers', 'setChatStepFoldHandlers', []),
  withState('errors', 'setErrors', null),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        id: json.id,
        name: json.name || '',
        title: json.title || '',
        chatBubbleText: json.chatBubbleText || '',
        personaId: (json.persona && json.persona.id) || '',
        __persona: json.persona,
        chatStepAttributes: json.chatStepAttributes ? treatChatSteps(json.chatStepAttributes, {}) : undefined,
      }
    },
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
  withHandlers({
    scrollToStep: ({ chatStepFoldHandlers }) => chatStep => {
      if (!chatStep.__ref.current) return
      chatStepFoldHandlers
        .find(chatStepFoldHandler => chatStep.__index === chatStepFoldHandler.index)
        .setIsFolded(false)
      chatStep.__ref.current.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
    },
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => selected => {
      setForm({
        ...form,
        personaId: selected && selected.value.id,
      })
    },
    onFormSubmit: ({ location, formRef, history, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      setIsFormSubmitting(true)
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      if (location.pathname !== routes.scriptedChatEdit(result.id)) history.push(routes.scriptedChatEdit(result.id))
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
    title: breadcrumbs[breadcrumbs.length - 1].text,
  }))
)(ScriptedChatForm)
