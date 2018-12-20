import CurationForm from './form'
import routes from 'app/routes'
import { apiScriptedChatShow, apiScriptedChatUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

const convertNestedLabel = destinationChatStepAttributes => {
  // if (destinationChatStepAttributes.chatOptionsAttributes.length === 0) return
  let convertedDestinationChatStep = Object.defineProperty(
    destinationChatStepAttributes,
    '__label',
    Object.getOwnPropertyDescriptor(destinationChatStepAttributes, 'label')
  )
  delete convertedDestinationChatStep['label']
  console.log(convertedDestinationChatStep)
  // if (!convertedDestinationChatStep.chatOptionsAttributes) return
  return convertNestedLabel(convertedDestinationChatStep.chatOptionsAttributes[0].destinationChatStepAttributes)
}

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
        name: response.name || '',
        title: response.title || '',
        personaId: response.persona.id || '',
        __persona: response.persona,
        chatStepAttributes: {
          __label: response.chatStepAttributes.label,
          id: response.chatStepAttributes.id,
          chatMessagesAttributes: response.chatStepAttributes.chatMessagesAttributes || [
            {
              delay: '',
              text: '',
            },
          ],
          chatOptionsAttributes: convertNestedLabel(
            response.chatStepAttributes.chatOptionsAttributes[0].destinationChatStepAttributes
          ),
        },
      }
    },
  }),
  withProps({
    showChildSteps: true,
  })
)(CurationForm)
