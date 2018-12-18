import ChatStep from './chat-step'
import CircularProgress from 'shared/circular-progress'
import omit from 'lodash.omit'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Select from 'shared/select'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, Form } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { TextField } from '@material-ui/core'
import { withRouter } from 'react-router'

const ScriptedChatForm = ({
  addChatStepAttribute,
  deleteChatStepAttribute,
  editChatStepAttribute,
  errors,
  form,
  formRef,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  selectPersona,
  setFieldValue,
  setForm,
  showChildSteps,
  title,
}) => (
  <Section title={title}>
    <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
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
      <Select
        autocomplete={apiPersonasAutocomplete}
        defaultValue={form.__persona && { value: form.__persona.id, label: form.__persona.name }}
        onChange={selectPersona}
        placeholder="Persona *"
      />
      <ChatStep
        addAction={addChatStepAttribute}
        chatStepType="chatStepAttributes"
        deleteAction={deleteChatStepAttribute}
        form={form}
        index={0}
        onChange={editChatStepAttribute}
        setForm={setForm}
        showChildSteps={showChildSteps}
      />
    </Form>
  </Section>
)

export default compose(
  withProps({ formRef: React.createRef() }),
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
          delay: '',
          text: '',
        },
      ],
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
  withHandlers({
    editChatStepAttribute: ({ setForm, form }) => (
      chatStepAttributeIndex,
      newValue,
      chatStepAttribute,
      childForm,
      chatStepType
    ) => {
      const newChatStepAttributes = [...childForm[chatStepType][chatStepAttribute]]
      newChatStepAttributes[chatStepAttributeIndex][newValue.name] = newValue.value
      setForm(chatStepType === 'chatStepAttributes' ? { ...form, ...childForm } : { ...form })
    },
    addChatStepAttribute: ({ setForm, form }) => (newValue, chatStepAttribute, childForm, chatStepType) => {
      childForm[chatStepType][chatStepAttribute] = [...childForm[chatStepType][chatStepAttribute], newValue]
      setForm(chatStepType === 'chatStepAttributes' ? { ...form, ...childForm } : { ...form })
    },
    deleteChatStepAttribute: ({ setForm, form }) => (
      chatStepAttributeIndex,
      chatStepAttribute,
      childForm,
      chatStepType
    ) => {
      // we need to destroy the record and remove its reference from the messages/options array in destinationChatStepAttributes
      if (childForm[chatStepType][chatStepAttribute]) {
        //remove unwanted fields in object we want to delete
        let newObject
        let filteredObject = childForm[chatStepType][chatStepAttribute][chatStepAttributeIndex]
        if (chatStepAttribute === 'chatMessagesAttributes') {
          newObject = omit(filteredObject, ['delay', 'text'])
        } else {
          // filteredObject = childForm[chatStepType][chatStepAttribute][chatStepAttributeIndex]
          newObject = omit(filteredObject, ['text'])
        }
        //if the object we want to delete has an id, it means it's in the db, we need to destroy it in the backend
        //if not, we just remove it from the form
        if (childForm[chatStepType][chatStepAttribute][chatStepAttributeIndex].id) {
          childForm[chatStepType][chatStepAttribute][chatStepAttributeIndex] = { ...newObject, _destroy: true }
          //update the form to show the change
          if (childForm[chatStepType][chatStepAttribute][chatStepAttributeIndex].destinationChatStepAttributes) {
            Object.assign(
              childForm[chatStepType][chatStepAttribute][chatStepAttributeIndex].destinationChatStepAttributes[
                chatStepAttribute
              ].splice(chatStepAttributeIndex, 1),
              childForm[chatStepType][chatStepAttribute][chatStepAttributeIndex].destinationChatStepAttributes[
                chatStepAttribute
              ]
            )
          }
        } else {
          //update the form to show the change
          Object.assign(
            childForm[chatStepType].chatOptionsAttributes.splice(chatStepAttributeIndex, 1),
            childForm[chatStepType].chatOptionsAttributes[chatStepAttributeIndex]
          )
        }
      }
      setForm(chatStepType === 'chatStepAttributes' ? { ...form, ...childForm } : { ...form })
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
