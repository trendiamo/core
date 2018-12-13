import CurationForm from './form'
import routes from 'app/routes'
import { apiCurationShow, apiCurationUpdate } from 'utils'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { extractErrors } from 'utils/shared'
import { uploadImage } from 'shared/picture-uploader'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Curations', route: routes.curationsList() }, { text: 'Edit Curation' }],
  }),
  withState('productPicksPictures', 'setProductPicksPictures', []),
  withHandlers({
    saveFormObject: ({ match, productPicksPictures }) => async (form, { setErrors }) => {
      const id = match.params.curationId
      await Promise.all(
        productPicksPictures.map(async productPicksPicture => {
          const productPickPhotoUrl = await uploadImage({
            blob: productPicksPicture.blob,
            setProgress: productPicksPicture.setProgress,
            type: 'products-pics',
            defaultValue:
              form.spotlightsAttributes[productPicksPicture.spotlightIndex].productPicksAttributes[
                productPicksPicture.productPickIndex
              ],
          })
          form.spotlightsAttributes[productPicksPicture.spotlightIndex].productPicksAttributes[
            productPicksPicture.productPickIndex
          ] = {
            ...form.spotlightsAttributes[productPicksPicture.spotlightIndex].productPicksAttributes[
              productPicksPicture.productPickIndex
            ],
            picUrl: productPickPhotoUrl,
          }
        })
      )
      const response = await apiCurationUpdate(id, { curation: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async () => {
      const id = match.params.curationId
      const response = await apiCurationShow(id)
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
)(CurationForm)
