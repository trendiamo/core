import BaseShowcaseForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiRequest, apiShowcaseShow, apiShowcaseUpdate } from 'utils'
import { useSnackbar } from 'notistack'

const ShowcaseForm = ({ match, ...props }) => {
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(
    () => {
      return (async () => {
        const id = match.params.showcaseId
        const { json, requestError } = await apiRequest(apiShowcaseShow, [id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.showcaseId]
  )

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const id = match.params.showcaseId
        const { json, errors, requestError } = await apiRequest(apiShowcaseUpdate, [id, { showcase: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated showcase', { variant: 'success' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.showcaseId]
  )

  return (
    <BaseShowcaseForm
      {...props}
      backRoute={routes.showcasesList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      match={match}
      saveFormObject={saveFormObject}
      title="Edit Showcase"
    />
  )
}

export default ShowcaseForm
