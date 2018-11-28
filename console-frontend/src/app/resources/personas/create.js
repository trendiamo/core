import PersonaForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiPersonaCreate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { uploadImage } from 'shared/picture-uploader'
import { withRouter } from 'react-router'

export default compose(
  withRaTitle('Create Persona'),
  withRouter,
  withHandlers({
    saveFormObject: ({ setInfo, setProgress, profilePic }) => async form => {
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'personas-profile-pics',
        defaultValue: form.profilePicUrl,
      })
      const data = { ...form, profilePicUrl }
      return await apiPersonaCreate({ persona: data }, setInfo)
    },
    afterSave: ({ history }) => result => {
      result && history.push('/')
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
