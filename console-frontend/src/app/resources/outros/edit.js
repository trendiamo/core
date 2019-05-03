import BaseOutroForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiOutroShow, apiOutroUpdate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const OutroForm = ({ match, ...props }) => {
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(
    () => {
      return (async () => {
        const id = match.params.outroId
        const { json, requestError } = await apiRequest(apiOutroShow, [id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.outroId]
  )

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const id = match.params.outroId
        const { json, errors, requestError } = await apiRequest(apiOutroUpdate, [id, { outro: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated outro', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.outroId]
  )

  return (
    <BaseOutroForm
      {...props}
      backRoute={routes.outrosList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      match={match}
      saveFormObject={saveFormObject}
      title="Edit Outro"
    />
  )
}

export default OutroForm
