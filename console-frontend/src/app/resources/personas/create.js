import PersonaForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiPersonaCreate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { uploadImage } from 'shared/picture-uploader'

export default compose(
  withRaTitle('Create Persona'),
  withHandlers({
    saveFormObject: () => async (form, { setProgress, profilePic, setInfo }) => {
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'personas-profile-pics',
        defaultValue: form.profilePicUrl,
      })
      const data = { ...form, profilePicUrl }
      return await apiPersonaCreate({ persona: data }, setInfo)
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
