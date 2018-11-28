import TriggerForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiTriggerCreate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router'

export default compose(
  withRaTitle('Create Trigger'),
  withRouter,
  withHandlers({
    saveFormObject: ({ setInfo }) => async form => {
      return await apiTriggerCreate({ trigger: form }, setInfo)
    },
    afterSave: ({ history }) => result => {
      result && history.push('/triggers')
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
