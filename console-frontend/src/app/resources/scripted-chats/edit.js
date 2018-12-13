import CurationForm from './form'
import routes from 'app/routes'
import { apiScriptedChatShow, apiScriptedChatUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

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
      return {
        id: response.id || '',
        name: response.name || '',
        title: response.title || '',
        personaId: response.persona.id || '',
        chatStepAttributes: {
          id: response.chatStepAttributes.id,
          chatMessagesAttributes: response.chatStepAttributes.chatMessagesAttributes || [
            {
              delay: '',
              text: '',
            },
          ],
          chatOptionsAttributes: response.chatStepAttributes.chatOptionsAttributes,
        },
      }
    },
  }),
  withProps({
    showChildSteps: true,
  })
)(CurationForm)
