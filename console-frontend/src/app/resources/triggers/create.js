import React from 'react'
import routes from 'app/routes'
import TriggerForm from './form'
import { apiRequest, apiTriggerCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const TriggerForm1 = compose(
  withProps({
    backRoute: routes.triggersList(),
    title: 'Create Trigger',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiTriggerCreate, [{ trigger: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully created trigger', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        flowId: '',
        flowType: '',
        urlMatchers: [''],
      }
    },
  })
)(TriggerForm)

const TriggerForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <TriggerForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default TriggerForm2
