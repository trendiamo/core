import React from 'react'
import routes from 'app/routes'
import ScriptedChatForm from './form'
import { apiRequest, apiScriptedChatShow, apiScriptedChatUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

const newEmptyChatMessage = () => ({ text: '' })

const treatChatSteps = (chatStep, ids, extraIndex = 0) => ({
  id: chatStep.id,
  chatMessagesAttributes: chatStep.chatMessagesAttributes || [newEmptyChatMessage()],
  chatOptionsAttributes: chatStep.chatOptionsAttributes.map((chatOptionAttributes, i) =>
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
  withProps({
    breadcrumbs: [{ text: 'Scripted Chats', route: routes.scriptedChatsList() }, { text: 'Edit Scripted Chat' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.scriptedChatId
      const { json, errors, requestError } = await apiRequest(apiScriptedChatUpdate, [id, { scriptedChat: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      if (!errors && !requestError) enqueueSnackbar('Successfully updated scripted chat', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.scriptedChatId
      const { json, requestError } = await apiRequest(apiScriptedChatShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      let result = {
        name: json.name || '',
        title: json.title || '',
        chatBubbleText: json.chatBubbleText || '',
        personaId: json.persona.id || '',
        __persona: json.persona,
      }
      if (json.chatStepAttributes) {
        result = {
          ...result,
          chatStepAttributes: treatChatSteps(json.chatStepAttributes, {}),
        }
      }
      return result
    },
  }),
  withProps({
    showChildSteps: true,
  })
)(ScriptedChatForm)
