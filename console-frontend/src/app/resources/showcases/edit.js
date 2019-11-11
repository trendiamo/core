import React, { useCallback } from 'react'
import routes from 'app/routes'
import ShowcaseForm from './form'
import { apiRequest, apiShowcaseShow, apiShowcaseUpdate } from 'utils'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditShowcaseForm = () => {
  const { showcaseId } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(() => {
    return (async () => {
      const { json, requestError } = await apiRequest(apiShowcaseShow, [showcaseId])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    })()
  }, [enqueueSnackbar, showcaseId])

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiShowcaseUpdate, [showcaseId, { showcase: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated showcase', { variant: 'success' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, showcaseId]
  )

  return (
    <ShowcaseForm
      backRoute={routes.showcasesList()}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Edit Showcase"
    />
  )
}

export default EditShowcaseForm
