import PersonaForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiPersonaCreate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { extractErrors } from 'utils/shared'
import { uploadImage } from 'shared/picture-uploader'

export default compose(
  withRaTitle('Create Persona'),
  withHandlers({
    saveFormObject: () => async (form, { setProgress, profilePic, setErrors }) => {
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'personas-profile-pics',
        defaultValue: form.profilePicUrl,
      })
      const data = { ...form, profilePicUrl }
      const response = await apiPersonaCreate({ persona: data })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        description: '',
        profilePicUrl: '',
      }
    },
  })
)(PersonaForm)
