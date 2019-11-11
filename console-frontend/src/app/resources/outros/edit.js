import OutroForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiOutroShow, apiOutroUpdate, apiRequest } from 'utils'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditOutroForm = () => {
  let { outroId } = useParams()

  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(() => {
    return (async () => {
      const { json, requestError } = await apiRequest(apiOutroShow, [outroId])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    })()
  }, [enqueueSnackbar, outroId])

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiOutroUpdate, [outroId, { outro: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated outro', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar, outroId]
  )

  return (
    <OutroForm
      backRoute={routes.outrosList()}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Edit Outro"
    />
  )
}

export default EditOutroForm
