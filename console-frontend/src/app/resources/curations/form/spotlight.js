import ProductPick from './product-pick'
import React from 'react'
import Select from 'shared/select'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { compose, withHandlers } from 'recompose'
import { Grid, TextField } from '@material-ui/core'

const Spotlight = ({
  addProductPick,
  index,
  deleteProductPick,
  selectPersona,
  form,
  editProductPickValue,
  isFormLoading,
  editSpotlightValue,
}) => (
  <React.Fragment>
    <Grid item sm={6}>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Text"
        margin="normal"
        name="text"
        onChange={editSpotlightValue}
        required
        value={form.spotlightsAttributes[index].text}
      />
      <Select
        autocomplete={apiPersonasAutocomplete}
        defaultValue={
          form.spotlightsAttributes[index].__persona && {
            value: form.spotlightsAttributes[index].__persona.id,
            label: form.spotlightsAttributes[index].__persona.name,
          }
        }
        name="personaId"
        onChange={selectPersona}
        placeholder="Persona *"
      />
    </Grid>
    <div style={{ marginTop: '24px' }}>
      <FormSection foldable title="Product Picks">
        {form.spotlightsAttributes[index].productPicksAttributes &&
          form.spotlightsAttributes[index].productPicksAttributes.map(
            (productPick, productPickIndex) =>
              !productPick._destroy && (
                // eslint-disable-next-line react/no-array-index-key
                <div key={productPickIndex}>
                  <FormSection
                    actions={
                      form.spotlightsAttributes[index].productPicksAttributes.length > 1 && (
                        <Cancel disabled={isFormLoading} index={productPickIndex} onClick={deleteProductPick} />
                      )
                    }
                    hideBottom
                    hideTop={productPickIndex === 0}
                    title={`Product Pick #${productPickIndex + 1}`}
                  >
                    <ProductPick
                      form={form.spotlightsAttributes[index]}
                      index={productPickIndex}
                      onChange={editProductPickValue}
                    />
                  </FormSection>
                </div>
              )
          )}
      </FormSection>
    </div>
    <AddItemButton disabled={isFormLoading} index={index} message="Add Another Product Pick" onClick={addProductPick} />{' '}
  </React.Fragment>
)

export default compose(
  withHandlers({
    editSpotlightValue: ({ index, onChange }) => event => {
      onChange(index, event.target)
    },
    selectPersona: ({ form, setForm, index }) => ({ value }) => {
      const newSpotlightAttributes = {
        ...form.spotlightsAttributes[index],
        personaId: value.id,
        __persona: value,
      }
      form.spotlightsAttributes[index] = newSpotlightAttributes
      setForm(form)
    },
    addProductPick: ({ form, index, setForm }) => () => {
      const newProductPicks = [
        ...form.spotlightsAttributes[index].productPicksAttributes,
        {
          url: '',
          name: '',
          description: '',
          displayPrice: '',
          picUrl: '',
        },
      ]
      form.spotlightsAttributes[index].productPicksAttributes = newProductPicks
      setForm(form)
    },
    deleteProductPick: ({ index, form, setForm }) => productPickIndex => {
      const productPickToDelete = {
        id: form.spotlightsAttributes[index].productPicksAttributes[productPickIndex].id,
        _destroy: true,
      }
      let newProductPicks = [...form.spotlightsAttributes[index].productPicksAttributes]
      newProductPicks[productPickIndex] = productPickToDelete
      form.spotlightsAttributes[index].productPicksAttributes = newProductPicks
      setForm(form)
    },
  }),
  withHandlers({
    editProductPickValue: ({ setForm, index, form }) => (productPickIndex, newValue) => {
      const newProductPicks = [...form.spotlightsAttributes[index].productPicksAttributes]
      newProductPicks[productPickIndex][newValue.name] = newValue.value
      setForm({ ...form, productPicksAttributes: newProductPicks })
    },
  })
)(Spotlight)
