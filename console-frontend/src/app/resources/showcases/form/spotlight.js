import Autocomplete from 'shared/autocomplete'
import ProductPick from './product-pick'
import React from 'react'
import Section from 'shared/section'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { branch, compose, renderNothing, withHandlers } from 'recompose'
import { DragHandle, SortableContainer, SortableElement } from 'shared/sortable-elements'
import { findIndex } from 'lodash'

const SortableProductPick = SortableElement(ProductPick)
const ProductPicks = ({
  isFormLoading,
  isCropping,
  setIsCropping,
  spotlight,
  onChange,
  setProductPicture,
  onFocus,
}) => (
  <div>
    {spotlight.productPicksAttributes.map((productPick, index) => (
      <SortableProductPick
        allowDelete={spotlight.productPicksAttributes.length > 1}
        folded={productPick.id}
        index={index}
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        key={productPick.id || `new-${index}`}
        onChange={onChange}
        onFocus={onFocus}
        productPick={productPick}
        setIsCropping={setIsCropping}
        setProductPicture={setProductPicture}
        sortIndex={index}
      />
    ))}
  </div>
)
const ProductPicksContainer = SortableContainer(ProductPicks)

const Spotlight = ({
  addProductPick,
  allowDelete,
  selectPersona,
  spotlight,
  isFormLoading,
  deleteSpotlight,
  setProductPickForm,
  folded,
  setProductPicture,
  setIsCropping,
  index,
  isCropping,
  onSortEnd,
  onFocus,
}) => (
  <Section>
    <FormSection
      actions={allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteSpotlight} />}
      dragHandle={<DragHandle />}
      ellipsize
      foldable
      folded={folded}
      hideTop
      title={spotlight.id ? `${spotlight.__persona && spotlight.__persona.name}'s Spotlight` : 'New Spotlight'}
    >
      <Autocomplete
        autocomplete={apiPersonasAutocomplete}
        defaultPlaceholder="Choose a persona"
        disabled={isCropping || isFormLoading}
        fullWidth
        initialSelectedItem={spotlight.__persona && { value: spotlight.__persona, label: spotlight.__persona.name }}
        label="Persona"
        onChange={selectPersona}
        options={{ suggestionItem: 'withAvatar' }}
        required
      />
      <div style={{ marginTop: '24px' }}>
        <FormSection foldable title="Product Picks">
          {spotlight.productPicksAttributes && (
            <ProductPicksContainer
              helperClass="sortable-element"
              isCropping={isCropping}
              onChange={setProductPickForm}
              onFocus={onFocus}
              onSortEnd={onSortEnd}
              setIsCropping={setIsCropping}
              setProductPicture={setProductPicture}
              spotlight={spotlight}
              useDragHandle
            />
          )}
          <AddItemButton disabled={isCropping || isFormLoading} message="Add Product Pick" onClick={addProductPick} />{' '}
        </FormSection>
      </div>
    </FormSection>
  </Section>
)

export default compose(
  branch(({ spotlight }) => spotlight._destroy, renderNothing),
  withHandlers({
    selectPersona: ({ spotlight, index, onChange }) => selected => {
      onChange(
        {
          ...spotlight,
          personaId: selected && selected.value.id,
          __persona: selected && selected.value,
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
          ...spotlight,
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
    onSortEnd: ({ onChange, index, spotlight }) => ({ oldIndex, newIndex }) => {
      const orderedProductPicks = arrayMove(spotlight.productPicksAttributes, oldIndex, newIndex)
      onChange({ ...spotlight, productPicksAttributes: orderedProductPicks }, index)
    },
  })
)(Spotlight)
