import OutroForm from './form'
import React from 'react'
import routes from 'app/routes'
import { apiOutroShow, apiOutroUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const OutroForm1 = compose(
  withProps({
    backRoute: routes.outrosList(),
    title: 'Edit Outro',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async form => {
      const id = match.params.outroId
      const { json, errors, requestError } = await apiRequest(apiOutroUpdate, [id, { outro: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated outro', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.outroId
      const { json, requestError } = await apiRequest(apiOutroShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  })
)(OutroForm)

const OutroForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <OutroForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default OutroForm2
