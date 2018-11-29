import PersonaForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiPersonaShow, apiPersonaUpdate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { extractErrors } from 'utils/shared'
import { uploadImage } from 'shared/picture-uploader'

export default compose(
  withRaTitle('Edit Persona'),
  withHandlers({
    saveFormObject: ({ match }) => async (form, { setProgress, profilePic, setErrors }) => {
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'personas-profile-pics',
        defaultValue: form.profilePicUrl,
      })
      const id = match.params.personaId
      const data = { ...form, profilePicUrl }
      const response = await apiPersonaUpdate(id, { persona: data })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async () => {
      const id = match.params.personaId
      const result = await apiPersonaShow(id)
      const resultObject = {
        name: result.name || '',
        description: result.description || '',
        profilePicUrl: result.profilePicUrl || '',
      }
      return resultObject
    },
  })
)(PersonaForm)
