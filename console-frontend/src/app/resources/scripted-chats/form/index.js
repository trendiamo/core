import ChatStep from './chat-step'
import CircularProgress from 'shared/circular-progress'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import sanitizeProps from 'shared/sanitize-props'
import SaveIcon from '@material-ui/icons/Save'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { apiPersonaSimpleList, apiScriptedChatUpdate } from 'utils'
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Prompt, withRouter } from 'react-router'

const Actions = ({ isFormLoading, onFormSubmit }) => (
  <Button color="primary" disabled={isFormLoading} onClick={onFormSubmit} type="submit" variant="contained">
    <SaveIcon />
    {'Save'}
  </Button>
)

const StyledAvatar = styled(Avatar)`
  display: inline-block;
`

const StyledTypography = styled(Typography)`
  display: inline-block;
  margin-left: 20px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
`

const ScriptedChatForm = ({
  setFieldValue,
  form,
  personas,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  editChatStepAttribute,
  setForm,
  addChatStepAttribute,
  deleteChatStepAttribute,
  showChildSteps,
  title,
}) => (
  <PaperContainer>
    <Typography variant="subtitle1">{title}</Typography>
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Notification data={errors} />
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
      <FormControl disabled={isFormLoading} fullWidth>
        <InputLabel htmlFor="persona-label-placeholder" shrink>
          {'Persona'}
        </InputLabel>
        <Select
          displayEmpty
          input={<Input id="persona-label-placeholder" name="persona" />}
          name="personaId"
          onChange={setFieldValue}
          value={form.personaId}
        >
          {personas.map(persona => (
            <MenuItem key={`persona-${persona.id}`} value={persona.id}>
              <Item>
                <StyledAvatar alt={persona.name} src={persona.profilePicUrl} />
                <StyledTypography>{persona.name}</StyledTypography>
              </Item>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
    </form>
  </PaperContainer>
)

export default compose(
  withState('errors', 'setErrors', null),
  withState('personas', 'setPersonas', []),
  withHandlers({
    loadFormObject: ({ loadFormObject, setPersonas }) => async () => {
      const personas = await apiPersonaSimpleList()
      setPersonas(personas)
      return loadFormObject()
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
          delay: '',
          text: '',
        },
      ],
    },
  }),
  withRouter,
  withHandlers({
    onFormSubmit: ({ form, history, onFormSubmit, setForm }) => async event => {
      const result = form.id ? await apiScriptedChatUpdate(form.id, { scripted_chat: form }) : await onFormSubmit(event)
      if (result.error || result.errors) return
      if (!form.id) {
        history.push(routes.scriptedChatEdit(result.id))
      } else {
        setForm({
          id: result.id || '',
          name: result.name || '',
          title: result.title || '',
          personaId: result.persona.id || '',
          chatStepAttributes: {
            id: result.chatStepAttributes.id,
            chatMessagesAttributes: result.chatStepAttributes.chatMessagesAttributes || [
              {
                delay: '',
                text: '',
              },
            ],
            chatOptionsAttributes: result.chatStepAttributes.chatOptionsAttributes,
          },
        })
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
          newObject = sanitizeProps(filteredObject, ['delay', 'text'])
        } else {
          // filteredObject = childForm[chatStepType][chatStepAttribute][chatStepAttributeIndex]
          newObject = sanitizeProps(filteredObject, ['text'])
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
    Actions: <Actions isFormLoading={isFormLoading} onFormSubmit={onFormSubmit} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(ScriptedChatForm)
