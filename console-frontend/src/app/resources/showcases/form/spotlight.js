import ProductPick from './product-pick'
import React from 'react'
import Section from 'shared/section'
import Select from 'shared/select'
import styled from 'styled-components'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete, apiProductPickSort } from 'utils'
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { createGlobalStyle } from 'styled-components'
import { findIndex } from 'lodash'
import { Grid, TextField } from '@material-ui/core'
import { Reorder as ReorderIcon } from '@material-ui/icons'
import { SortableHandle } from 'react-sortable-hoc'

const ProductPicksList = styled.ul`
  padding: 0;
`

const SortableProductPick = SortableElement(({ productPickIndex, ...props }) => (
  <ProductPick index={productPickIndex} {...props} />
))

const ProductPicksContainer = compose(
  withProps(() => ({
    lockAxis: 'y',
    lockToContainerEdges: true,
    lockOffset: '0%',
  }))
)(
  SortableContainer(({ isFormLoading, isCropping, setIsCropping, spotlight, onChange, setProductPicture }) => (
    <ProductPicksList>
      {spotlight.productPicksAttributes.map((productPick, productPickIndex) => (
        <SortableProductPick
          allowDelete={spotlight.productPicksAttributes.length > 1}
          index={productPickIndex}
          isCropping={isCropping}
          isFormLoading={isFormLoading}
          key={productPick.id}
          onChange={onChange}
          productPick={productPick}
          productPickIndex={productPickIndex}
          setIsCropping={setIsCropping}
          setProductPicture={setProductPicture}
        />
      ))}
    </ProductPicksList>
  ))
)

const ProductPicksRowStyle = createGlobalStyle`
  .sortable-product-pick-row {
    z-index: 1;
  }
`

const StyledReorderIcon = styled(ReorderIcon)`
  cursor: ns-resize;
  color: rgba(0, 0, 0, 0.54);
  margin-right: 1rem;
`

const DragHandle = SortableHandle(({ ...props }) => <StyledReorderIcon {...props} />)

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
  onSortEnd,
}) => (
  <Section>
    <FormSection
      actions={allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteSpotlight} />}
      dragHandle={<DragHandle />}
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
          <ProductPicksRowStyle />
          {spotlight.productPicksAttributes && (
            <ProductPicksContainer
              helperClass="sortable-product-pick-row"
              isCropping={isCropping}
              onChange={setProductPickForm}
              onSortEnd={onSortEnd}
              setIsCropping={setIsCropping}
              setProductPicture={setProductPicture}
              spotlight={spotlight}
              useDragHandle
            />
          )}
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
    onSortEnd: ({ onChange, index, spotlight }) => async ({ oldIndex, newIndex }) => {
      const orderedProductPicks = arrayMove(spotlight.productPicksAttributes, oldIndex, newIndex)
      const orderedIds = orderedProductPicks.map(productPick => productPick.id)
      onChange({ ...spotlight, productPicksAttributes: orderedProductPicks }, index)
      await apiProductPickSort({ ids: orderedIds })
    },
  })
)(Spotlight)
