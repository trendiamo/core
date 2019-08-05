import React, { useCallback } from 'react'
import routes from 'app/routes'
import SellerForm from './form'
import { apiRequest, apiSellerShow, apiSellerUpdate } from 'utils'
import { useSnackbar } from 'notistack'

const EditSellerForm = ({ match }) => {
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(
    () => {
      return (async () => {
        const id = match.params.sellerId
        const { json, requestError } = await apiRequest(apiSellerShow, [id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.sellerId]
  )

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const id = match.params.sellerId
        const { json, errors, requestError } = await apiRequest(apiSellerUpdate, [id, { seller: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated seller', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.sellerId]
  )

  return (
    <SellerForm
      backRoute={routes.sellersList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      match={match}
      saveFormObject={saveFormObject}
      title="Edit Seller"
    />
  )
}

export default EditSellerForm
