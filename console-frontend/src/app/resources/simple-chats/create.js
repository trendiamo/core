import React from 'react'
import routes from 'app/routes'
import SimpleChatForm from './form'
import { apiRequest, apiSimpleChatCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const SimpleChatForm1 = compose(
  withProps({
    backRoute: routes.simpleChatsList(),
    title: 'Create Simple Chat',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiSimpleChatCreate, [{ simpleChat: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully created simple chat', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        title: '',
        personaId: '',
        chatBubbleText: '',
        chatBubbleExtraText: '',
        simpleChatStepsAttributes: [
          {
            key: 'default',
            simpleChatMessagesAttributes: [{ text: '' }],
          },
        ],
      }
    },
  })
)(SimpleChatForm)

const SimpleChatForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <SimpleChatForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default SimpleChatForm2
