import NavigationForm from './form'
import React from 'react'
import routes from 'app/routes'
import { apiNavigationShow, apiNavigationUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const NavigationForm1 = compose(
  withProps({
    backRoute: routes.navigationsList(),
    title: 'Edit Navigation',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async form => {
      const id = match.params.navigationId
      const { json, errors, requestError } = await apiRequest(apiNavigationUpdate, [id, { navigation: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated navigation', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.navigationId
      const { json, requestError } = await apiRequest(apiNavigationShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  })
)(NavigationForm)

const NavigationForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <NavigationForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default NavigationForm2
