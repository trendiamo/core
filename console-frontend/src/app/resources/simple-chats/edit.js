import React from 'react'
import routes from 'app/routes'
import SimpleChatForm from './form'
import { apiRequest, apiSimpleChatShow, apiSimpleChatUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const SimpleChatForm1 = compose(
  withProps({
    backRoute: routes.simpleChatsList(),
    title: 'Edit Simple Chat',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async form => {
      const id = match.params.simpleChatId
      const { json, errors, requestError } = await apiRequest(apiSimpleChatUpdate, [id, { simpleChat: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated simple chat', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.simpleChatId
      const { json, requestError } = await apiRequest(apiSimpleChatShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  }),
  withProps({
    showChildSteps: true,
  })
)(SimpleChatForm)

const SimpleChatForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <SimpleChatForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default SimpleChatForm2
