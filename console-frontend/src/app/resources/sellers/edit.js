import React, { useCallback } from 'react'
import routes from 'app/routes'
import SellerForm from './form'
import { apiRequest, apiSellerShow, apiSellerUpdate } from 'utils'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditSellerForm = () => {
  const { sellerId } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(() => {
    return (async () => {
      const { json, requestError } = await apiRequest(apiSellerShow, [sellerId])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    })()
  }, [enqueueSnackbar, sellerId])

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiSellerUpdate, [sellerId, { seller: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated seller', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar, sellerId]
  )

  return (
    <SellerForm
      backRoute={routes.sellersList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Edit Seller"
    />
  )
}

export default EditSellerForm
