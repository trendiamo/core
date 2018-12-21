import CurationForm from './form'
import React from 'react'
import routes from 'app/routes'
import { apiScriptedChatShow, apiScriptedChatUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

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
  withHandlers({
    saveFormObject: ({ match }) => async (form, { setErrors }) => {
      const id = match.params.scriptedChatId
      const response = await apiScriptedChatUpdate(id, { scripted_chat: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async () => {
      const id = match.params.scriptedChatId
      const response = await apiScriptedChatShow(id)
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
)(CurationForm)
