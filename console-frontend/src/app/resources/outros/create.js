import OutroForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiOutroCreate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const loadFormObject = () => {
  return {
    sellerId: '',
    useSellerAnimation: false,
    name: '',
    chatBubbleText: '',
    chatBubbleButtonYes: '',
    chatBubbleButtonNo: '',
  }
}

const CreateOutroForm = () => {
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
    <OutroForm
      backRoute={routes.outrosList()}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Create Outro"
    />
  )
}

export default CreateOutroForm
