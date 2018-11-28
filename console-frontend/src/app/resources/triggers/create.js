import TriggerForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiTriggerCreate } from 'utils'
import { compose, withHandlers } from 'recompose'

export default compose(
  withRaTitle('Create Trigger'),
  withHandlers({
    saveFormObject: () => async (form, { setInfo }) => {
      return await apiTriggerCreate({ trigger: form }, setInfo)
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        order: '',
        flowId: '',
        flowType: '',
        urlMatchers: [''],
      }
    },
  })
)(TriggerForm)
