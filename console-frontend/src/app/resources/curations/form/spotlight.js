import debounce from 'debounce-promise'
import ProductPick from './product-pick'
import React from 'react'
import Select from 'shared/select'
import { AddItemButton, Cancel, Section } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { compose, withHandlers } from 'recompose'
import { Grid, TextField, Typography } from '@material-ui/core'

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
        label="Spotlight Text"
        margin="normal"
        name="text"
        onChange={editSpotlightValue}
        required
        value={form.spotlightsAttributes[index].text}
      />
      <Select
        autocomplete={debounce(apiPersonasAutocomplete, 150)}
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
      {form.spotlightsAttributes[index].productPicksAttributes.map((productPick, productPickIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={productPickIndex}>
          <Section
            actions={
              form.spotlightsAttributes[index].productPicksAttributes.length > 1 && (
                <Cancel disabled={isFormLoading} index={productPickIndex} onClick={deleteProductPick} />
              )
            }
            foldable
            title="Spotlight Product Picks"
          >
            <div>
              <Typography variant="subtitle1">{`Product Pick #${productPickIndex + 1}`}</Typography>
              <ProductPick
                form={form.spotlightsAttributes[index]}
                index={productPickIndex}
                onChange={editProductPickValue}
              />
            </div>
          </Section>
        </div>
      ))}
    </div>
    <AddItemButton disabled={isFormLoading} index={index} message="Add Another Product Pick" onClick={addProductPick} />{' '}
  </React.Fragment>
)

export default compose(
  withHandlers({
    editSpotlightValue: ({ index, onChange }) => event => {
      onChange(index, event.target)
    },
    selectPersona: ({ form, setForm, index }) => selected => {
      const newSpotlightAttributes = {
        ...form.spotlightsAttributes[index],
        personaId: selected.value.id,
        __persona: selected.value,
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
      let newProductPicks = [...form.spotlightsAttributes[index].productPicksAttributes]
      newProductPicks.splice(productPickIndex, 1)
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
