import PersonaForm from './form'
import React from 'react'
import routes from 'app/routes'
import { apiPersonaCreate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const PersonaForm1 = compose(
  withProps({
    backRoute: routes.personasList(),
    title: 'Create Persona',
    onboardingCreate: true,
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiPersonaCreate, [{ persona: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully created persona', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        description: '',
        profilePicUrl: '',
        instagramUrl: '',
      }
    },
  })
)(PersonaForm)

const PersonaForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <PersonaForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default PersonaForm2
