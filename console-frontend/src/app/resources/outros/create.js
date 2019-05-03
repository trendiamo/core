import BaseOutroForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiOutroCreate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const loadFormObject = () => {
  return {
    personaId: '',
    name: '',
    chatBubbleText: '',
    chatBubbleButtonYes: '',
    chatBubbleButtonNo: '',
  }
}

const OutroForm = props => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiOutroCreate, [{ outro: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully created outro', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <BaseOutroForm
      {...props}
      backRoute={routes.outrosList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Create Outro"
    />
  )
}

export default OutroForm
