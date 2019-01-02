import React from 'react'
import routes from 'app/routes'
import ScriptedChatForm from './form'
import { apiRequest, apiScriptedChatShow, apiScriptedChatUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withSnackbar } from 'notistack'

const newEmptyChatMessage = () => ({
  delay: '',
  text: '',
})

const treatChatSteps = (chatStep, ids) => ({
  id: chatStep.id,
  chatMessagesAttributes: chatStep.chatMessagesAttributes || [newEmptyChatMessage()],
  chatOptionsAttributes: chatStep.chatOptionsAttributes.map(chatOptionAttributes =>
    chatOptionAttributes.destinationChatStepAttributes
      ? {
          ...chatOptionAttributes,
          destinationChatStepAttributes: treatChatSteps(chatOptionAttributes.destinationChatStepAttributes, {
            ...ids,
            [chatStep.id]: true,
          }),
        }
      : chatOptionAttributes
  ),
  __index: Object.keys(ids).length,
  __ref: React.createRef(),
})

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Scripted Chats', route: routes.scriptedChatsList() }, { text: 'Edit Scripted Chat' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.scriptedChatId
      const response = await apiRequest(apiScriptedChatUpdate, [id, { scriptedChat: form }], {
        enqueueSnackbar,
        successMessage: 'Successfully Updated Scripted Chat',
        successVariant: 'success',
      })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.scriptedChatId
      const response = await apiRequest(apiScriptedChatShow, [id], {
        enqueueSnackbar,
      })
      let result = {
        name: response.name || '',
        title: response.title || '',
        personaId: response.persona.id || '',
        __persona: response.persona,
      }
      if (response.chatStepAttributes) {
        result = {
          ...result,
          chatStepAttributes: treatChatSteps(response.chatStepAttributes, {}),
        }
      }
      return result
    },
  }),
  withProps({
    showChildSteps: true,
  })
)(ScriptedChatForm)
