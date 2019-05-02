import NavigationForm from './form'
import React from 'react'
import routes from 'app/routes'
import { apiNavigationCreate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const NavigationForm1 = compose(
  withProps({
    backRoute: routes.navigationsList(),
    title: 'Create Navigation',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiNavigationCreate, [{ navigation: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        personaId: '',
        name: '',
        chatBubbleText: '',
        chatBubbleExtraText: '',
        navigationItemsAttributes: [
          {
            text: '',
            url: '',
            picUrl: '',
          },
        ],
      }
    },
  })
)(NavigationForm)

const NavigationForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <NavigationForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default NavigationForm2
