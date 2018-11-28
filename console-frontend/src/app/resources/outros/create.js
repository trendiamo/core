import OutroForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiOutroCreate } from 'utils'
import { compose, withHandlers } from 'recompose'

export default compose(
  withRaTitle('Create Outro'),
  withHandlers({
    saveFormObject: ({ setInfo }) => async form => {
      return await apiOutroCreate({ outro: form }, setInfo)
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        personaId: '',
      }
    },
  })
)(OutroForm)
