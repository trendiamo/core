import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import React, { useMemo } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import SimpleChatStep from './simple-chat-step'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, AddItemContainer, Field, Form, HelperText } from 'shared/form-elements'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharRegexp } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { branch, compose, renderComponent, shallowEqual, shouldUpdate, withHandlers, withProps } from 'recompose'
import { Grid } from '@material-ui/core'
import { isEqual, omit } from 'lodash'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const SortableSimpleChatStep = compose(
  shouldUpdate((props, nextProps) => {
    return !shallowEqual(props, nextProps) || !shallowEqual(props.simpleChatStep, nextProps.simpleChatStep)
  })
)(SortableElement(SimpleChatStep))

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

const SimpleChatStepsContainer = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onSortEnd', 'onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  })
)(SortableContainer(SimpleChatSteps))

const MainFormTemplate = ({ title, isFormLoading, form, setFieldValue, selectPersona }) => (
  <Section title={title}>
    <Grid item sm={6}>
      <Field
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
      <HelperText>{'The persona that will appear for this chat.'}</HelperText>
      <Field
        disabled={isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Title"
        margin="normal"
        max={characterLimits.main.title}
        name="title"
        onChange={setFieldValue}
        required
        value={form.title}
      />
      <HelperText>{'The title will appear at the top of the chat.'}</HelperText>
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Chat Bubble"
        margin="normal"
        max={characterLimits.main.chatBubbleText}
        name="chatBubbleText"
        onChange={setFieldValue}
        value={form.chatBubbleText}
      />
      <HelperText>{'Shows as a text bubble next to the plugin launcher.'}</HelperText>
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Extra Chat Bubble Text"
        margin="normal"
        max={characterLimits.main.chatBubble}
        name="chatBubbleExtraText"
        onChange={setFieldValue}
        value={form.chatBubbleExtraText}
      />
      <HelperText>{'Additional text bubble. Pops up after the first one.'}</HelperText>
    </Grid>
  </Section>
)

const MainForm = compose(
  shouldUpdate((props, nextProps) => {
    return (
      props.title !== nextProps.title ||
      props.isFormLoading !== nextProps.isFormLoading ||
      !shallowEqual(props.form, nextProps.form)
    )
  })
)(MainFormTemplate)

const SimpleChatForm = ({
  addSimpleChatStep,
  backRoute,
  form,
  formRef,
  isFormLoading,
  isFormPristine,
  isFormSubmitting,
  onFormSubmit,
  onSortEnd,
  selectPersona,
  setFieldValue,
  setSimpleChatStepsForm,
  title,
}) => {
  const appBarContent = useMemo(
    () => ({
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
    }),
    [backRoute, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, title]
  )
  useAppBarContent(appBarContent)
  return (
    <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
      <MainForm
        form={omit(form, ['simpleChatStepsAttributes'])}
        isFormLoading={isFormLoading}
        selectPersona={selectPersona}
        setFieldValue={setFieldValue}
        title={title}
      />
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
}

const SimpleChatForm1 = compose(
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
  withHandlers({
    selectPersona: ({ form, setForm }) => selected => {
      setForm({
        ...form,
        personaId: selected && selected.value.id,
      })
    },
    onFormSubmit: ({ formRef, history, location, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
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
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(SimpleChatForm)

const SimpleChatForm2 = props => {
  const defaultForm = {
    name: '',
    title: '',
    personaId: '',
    chatBubbleText: '',
    chatBubbleExtraText: '',
    simpleChatStepsAttributes: [
      {
        simpleChatMessagesAttributes: [{ text: '' }],
      },
    ],
  }
  const formProps = useForm({ ...props, defaultForm })
  return <SimpleChatForm1 {...props} {...formProps} />
}

const SimpleChatForm3 = compose(
  withProps({ formRef: React.createRef() }),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        id: json.id,
        name: json.name || '',
        title: json.title || '',
        chatBubbleText: json.chatBubbleText || '',
        chatBubbleExtraText: json.chatBubbleExtraText || '',
        personaId: (json.persona && json.persona.id) || '',
        __persona: json.persona,
        simpleChatStepsAttributes: json.simpleChatStepsAttributes || [
          {
            simpleChatMessagesAttributes: [{ text: '' }],
          },
        ],
      }
    },
  })
)(SimpleChatForm2)

const SimpleChatForm4 = ({ location, ...props }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'simpleChats', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)
  return <SimpleChatForm3 {...props} location={location} />
}

export default withRouter(SimpleChatForm4)
