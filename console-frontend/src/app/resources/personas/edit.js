import BasePersonaForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiPersonaShow, apiPersonaUpdate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const PersonaForm = ({ match, ...props }) => {
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(
    () => {
      return (async () => {
        const id = match.params.personaId
        const { json, requestError } = await apiRequest(apiPersonaShow, [id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.personaId]
  )

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const id = match.params.personaId
        const { json, errors, requestError } = await apiRequest(apiPersonaUpdate, [id, { persona: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated persona', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.personaId]
  )

  return (
    <BasePersonaForm
      {...props}
      backRoute={routes.personasList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      match={match}
      saveFormObject={saveFormObject}
      title="Edit Persona"
    />
  )
}

export default PersonaForm
