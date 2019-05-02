import OutroForm from './form'
import React from 'react'
import routes from 'app/routes'
import { apiOutroCreate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const OutroForm1 = compose(
  withProps({
    backRoute: routes.outrosList(),
    title: 'Create Outro',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiOutroCreate, [{ outro: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully created outro', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        personaId: '',
        name: '',
        chatBubbleText: '',
        chatBubbleButtonYes: '',
        chatBubbleButtonNo: '',
      }
    },
  })
)(OutroForm)

const OutroForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <OutroForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default OutroForm2
