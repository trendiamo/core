import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import SimpleChatStep from './simple-chat-step'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemContainer, Form, Field as LimitedField } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const SortableSimpleChatStep = SortableElement(SimpleChatStep)

const SimpleChatSteps = ({ allowDelete, simpleChatSteps, onChange }) => (
  <div>
    <SimpleChatStep
      allowDelete={false}
      onChange={onChange}
      simpleChatStep={simpleChatSteps[0]}
      simpleChatStepIndex={0}
    />
    {simpleChatSteps.slice(1).map((simpleChatStep, index) => (
      <SortableSimpleChatStep
        allowDelete={allowDelete}
        index={index + 1}
        key={simpleChatStep.id || `simple-chat-${index}`}
        onChange={onChange}
        simpleChatStep={simpleChatStep}
        simpleChatStepIndex={index + 1}
      />
    ))}
  </div>
)

const SimpleChatStepsContainer = SortableContainer(SimpleChatSteps)

const SimpleChatForm = ({
  addSimpleChatStep,
  errors,
  form,
  formRef,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  onSortEnd,
  selectPersona,
  setFieldValue,
  setSimpleChatStepsForm,
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
          label="Chat Bubble"
          margin="normal"
          max={characterLimits.main.chatBubble}
          name="chatBubble"
          onChange={setFieldValue}
          value={form.chatBubble}
        />
        <FormHelperText>{'Shows as a text bubble next to the plugin launcher.'}</FormHelperText>
      </Grid>
    </Section>
    <SimpleChatStepsContainer
      allowDelete={form.simpleChatStepsAttributes.length > 1}
      helperClass="sortable-element"
      isFormLoading={isFormLoading}
      onChange={setSimpleChatStepsForm}
      onSortEnd={onSortEnd}
      simpleChatSteps={form.simpleChatStepsAttributes}
      useDragHandle
    />
    <AddItemContainer disabled={isFormLoading} message="Add Option" onClick={addSimpleChatStep} />
  </Form>
)

export default compose(
  withOnboardingHelp({ single: true, stepName: 'simpleChats', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        id: json.id,
        name: json.name || '',
        title: json.title || '',
        chatBubble: json.chatBubble || '',
        personaId: (json.persona && json.persona.id) || '',
        __persona: json.persona,
        simpleChatStepsAttributes: json.simpleChatStepsAttributes || [
          {
            simpleChatMessagesAttributes: [{ text: '' }],
          },
        ],
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
    chatBubble: '',
    simpleChatStepsAttributes: [
      {
        simpleChatMessagesAttributes: [{ text: '' }],
      },
    ],
  }),
  withHandlers({
    setSimpleChatStepsForm: ({ form, setForm }) => (simpleChatStep, simpleChatStepIndex) => {
      let newsimpleChatStepsAttributes = [...form.simpleChatStepsAttributes]
      newsimpleChatStepsAttributes[simpleChatStepIndex] = simpleChatStep
      setForm({ ...form, simpleChatStepsAttributes: newsimpleChatStepsAttributes })
    },
    addSimpleChatStep: ({ form, setForm }) => () => {
      setForm({
        ...form,
        simpleChatStepsAttributes: [...form.simpleChatStepsAttributes, { key: '' }],
      })
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
    onFormSubmit: ({ formRef, history, location, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      setIsFormSubmitting(true)
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      if (location.pathname !== routes.simpleChatEdit(result.id)) history.push(routes.simpleChatEdit(result.id))
      setIsFormSubmitting(false)
      return result
    },
    onSortEnd: ({ setForm, form }) => ({ oldIndex, newIndex }) => {
      const orderedSimpleChatSteps = arrayMove(form.simpleChatStepsAttributes, oldIndex, newIndex)
      setForm({ ...form, simpleChatStepsAttributes: orderedSimpleChatSteps })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ backRoute, title, isFormLoading, isFormSubmitting, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isFormSubmitting || isFormLoading} />,
    backRoute,
    title,
  }))
)(SimpleChatForm)
