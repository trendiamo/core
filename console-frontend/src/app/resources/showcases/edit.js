import ShowcaseForm from './form'
import routes from 'app/routes'
import { apiShowcaseShow, apiShowcaseUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Showcases', route: routes.showcasesList() }, { text: 'Edit Showcase' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.showcaseId
      const response = await apiRequest(apiShowcaseUpdate, [id, { showcase: form }], {
        enqueueSnackbar,
      })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.showcaseId
      const response = await apiRequest(apiShowcaseShow, [id], {
        enqueueSnackbar,
      })
      return {
        name: response.name || '',
        personaId: response.persona.id || '',
        title: response.title || '',
        subtitle: response.subtitle || '',
        __persona: response.persona,
        spotlightsAttributes: response.spotlightsAttributes.map(spotlight => ({
          id: spotlight.id || '',
          text: spotlight.text || '',
          personaId: spotlight.persona.id || '',
          __persona: spotlight.persona,
          productPicksAttributes: spotlight.productPicksAttributes
            ? spotlight.productPicksAttributes.map(productPick => ({
                id: productPick.id || '',
                url: productPick.url || '',
                name: productPick.name || '',
                description: productPick.description || '',
                displayPrice: productPick.displayPrice || '',
                picUrl: productPick.picUrl || '',
              }))
            : [
                {
                  url: '',
                  name: '',
                  description: '',
                  displayPrice: '',
                  picUrl: '',
                },
              ],
        })),
      }
    },
  })
)(ShowcaseForm)
