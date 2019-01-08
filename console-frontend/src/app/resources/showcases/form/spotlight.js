import ProductPick from './product-pick'
import React from 'react'
import Section from 'shared/section'
import Select from 'shared/select'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, renderNothing, withHandlers } from 'recompose'
import { findIndex } from 'lodash'
import { Grid, TextField } from '@material-ui/core'

const Spotlight = ({
  addProductPick,
  allowDelete,
  selectPersona,
  spotlight,
  isFormLoading,
  deleteSpotlight,
  editSpotlightValue,
  setProductPickForm,
  setProductPicture,
  setIsCropping,
  index,
  isCropping,
}) => (
  <Section>
    <FormSection
      actions={allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteSpotlight} />}
      foldable
      hideTop
      title={`Spotlight #${index + 1}`}
    >
      <Grid item sm={6}>
        <TextField
          disabled={isCropping || isFormLoading}
          fullWidth
          label="Text"
          margin="normal"
          name="spotlight_text"
          onChange={editSpotlightValue}
          required
          value={spotlight.text}
        />
        <Select
          autocomplete={apiPersonasAutocomplete}
          defaultValue={
            spotlight.__persona && {
              value: spotlight.__persona.id,
              label: spotlight.__persona.name,
            }
          }
          disabled={isCropping || isFormLoading}
          label="Persona"
          name="spotlight_personaId"
          onChange={selectPersona}
          placeholder="Choose a persona"
          required
        />
      </Grid>
      <div style={{ marginTop: '24px' }}>
        <FormSection foldable title="Product Picks">
          {spotlight.productPicksAttributes &&
            spotlight.productPicksAttributes.map((productPick, productPickIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={productPickIndex}>
                <ProductPick
                  allowDelete={spotlight.productPicksAttributes.length > 1}
                  index={productPickIndex}
                  isCropping={isCropping}
                  onChange={setProductPickForm}
                  productPick={productPick}
                  setIsCropping={setIsCropping}
                  setProductPicture={setProductPicture}
                />
              </React.Fragment>
            ))}
        </FormSection>
      </div>
      <AddItemButton disabled={isCropping || isFormLoading} message="Add Product Pick" onClick={addProductPick} />{' '}
    </FormSection>
  </Section>
)

export default compose(
  branch(({ spotlight }) => spotlight._destroy, renderNothing),
  withHandlers({
    editSpotlightValue: ({ spotlight, index, onChange }) => event => {
      const name = event.target.name.replace('spotlight_', '')
      spotlight[name] = event.target.value
      onChange(spotlight, index)
    },
    selectPersona: ({ spotlight, index, onChange }) => ({ value }) => {
      onChange(
        {
          ...spotlight,
          personaId: value.id,
          __persona: value,
        },
        index
      )
    },
    addProductPick: ({ spotlight, index, onChange }) => () => {
      onChange(
        {
          ...spotlight,
          productPicksAttributes: [
            ...spotlight.productPicksAttributes,
            {
              url: '',
              name: '',
              description: '',
              displayPrice: '',
              picUrl: '',
            },
          ],
        },
        index
      )
    },
    deleteSpotlight: ({ spotlight, index, onChange }) => () => {
      onChange(
        {
          id: spotlight.id,
          _destroy: true,
        },
        index
      )
    },
    setProductPickForm: ({ spotlight, index, onChange }) => (productPick, productPickIndex) => {
      let newProductPicksAttributes = [...spotlight.productPicksAttributes]
      newProductPicksAttributes[productPickIndex] = productPick
      onChange({ ...spotlight, productPicksAttributes: newProductPicksAttributes }, index)
    },
    setProductPicture: ({ productPicksPictures, setProductPicksPictures, index }) => (
      productPickIndex,
      blob,
      setProgress
    ) => {
      const picture = { spotlightIndex: index, productPickIndex, blob, setProgress }
      let newProductPicksPictures = [...productPicksPictures]
      const productPickPictureIndex = findIndex(newProductPicksPictures, { spotlightIndex: index, productPickIndex })
      productPickPictureIndex >= 0
        ? newProductPicksPictures.splice(productPickPictureIndex, 1, picture)
        : newProductPicksPictures.push(picture)
      setProductPicksPictures(newProductPicksPictures)
    },
  })
)(Spotlight)
