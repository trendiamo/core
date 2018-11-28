import PersonaForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiPersonaShow, apiPersonaUpdate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { uploadImage } from 'shared/picture-uploader'

export default compose(
  withRaTitle('Edit Persona'),
  withHandlers({
    saveFormObject: ({ match }) => async (form, { setProgress, profilePic, setInfo }) => {
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'personas-profile-pics',
        defaultValue: form.profilePicUrl,
      })
      const id = match.params.personaId
      const data = { ...form, profilePicUrl }
      return await apiPersonaUpdate(id, { persona: data }, setInfo)
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async ({ setInfo }) => {
      const id = match.params.personaId
      const result = await apiPersonaShow(id, setInfo)
      const resultObject = {
        name: result.name || '',
        description: result.description || '',
        profilePicUrl: result.profilePicUrl || '',
      }
      setInfo(result)
      return resultObject
    },
  })
)(PersonaForm)
