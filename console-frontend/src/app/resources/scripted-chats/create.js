import routes from 'app/routes'
import ScriptedChatForm from './form'
import { apiScriptedChatCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Scripted Chats', route: routes.scriptedChatsList() }, { text: 'Create Scripted Chat' }],
  }),
  withHandlers({
    saveFormObject: () => async (form, { setErrors }) => {
      const response = await apiScriptedChatCreate({ scriptedChat: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
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
      }
    },
  })
)(ScriptedChatForm)
