import React, { useCallback } from 'react'
import routes from 'app/routes'
import SellerForm from './form'
import { apiRequest, apiSellerCreate } from 'utils'
import { useSnackbar } from 'notistack'

const loadFormObject = () => {
  return {
    name: '',
    bio: '',
    profilePic: { url: '' },
    profilePicAnimation: { url: '' },
    instagramUrl: '',
    picRect: {},
  }
}

const CreateSellerForm = () => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiSellerCreate, [{ seller: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully created seller', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <SellerForm
      backRoute={routes.sellersList()}
      loadFormObject={loadFormObject}
      onboardingCreate
      saveFormObject={saveFormObject}
      title="Create Seller"
    />
  )
}

export default CreateSellerForm
