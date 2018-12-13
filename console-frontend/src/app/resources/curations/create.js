import CurationForm from './form'
import routes from 'app/routes'
import { apiCurationCreate } from 'utils'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { extractErrors } from 'utils/shared'
import { uploadImage } from 'shared/picture-uploader'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Curations', route: routes.curationsList() }, { text: 'Create Curation' }],
  }),
  withState('productPicksPictures', 'setProductPicksPictures', []),
  withHandlers({
    saveFormObject: ({ productPicksPictures }) => async (form, { setProgress, setErrors }) => {
      await Promise.all(
        productPicksPictures.map(async productPicksPicture => {
          const productPickPhotoUrl = await uploadImage({
            blob: productPicksPicture.blob,
            setProgress,
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
      const response = await apiCurationCreate({ curation: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        personaId: '',
        title: '',
        subtitle: '',
        spotlightsAttributes: [
          {
            text: '',
            personaId: '',
            productPicksAttributes: [
              {
                url: '',
                name: '',
                description: '',
                displayPrice: '',
                picUrl: '',
              },
            ],
          },
        ],
      }
    },
  })
)(CurationForm)
