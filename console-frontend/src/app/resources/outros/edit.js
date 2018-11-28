import OutroForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiOutroShow, apiOutroUpdate } from 'utils'
import { compose, withHandlers } from 'recompose'

export default compose(
  withRaTitle('Edit Outro'),
  withHandlers({
    saveFormObject: ({ setInfo, match }) => async form => {
      const id = match.params.outroId
      return await apiOutroUpdate(id, { outro: form }, setInfo)
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async setInfo => {
      const id = match.params.outroId
      const response = await apiOutroShow(id, setInfo)
      return {
        personaId: response.persona.id || '',
      }
    },
  })
)(OutroForm)
