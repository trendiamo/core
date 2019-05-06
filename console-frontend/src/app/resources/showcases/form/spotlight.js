import Autocomplete from 'shared/autocomplete'
import ProductPick from './product-pick'
import React from 'react'
import Section from 'shared/section'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { branch, compose, renderNothing, shallowEqual, shouldUpdate, withHandlers, withProps } from 'recompose'
import { findIndex, isEqual, omit } from 'lodash'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableProductPick = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange', 'productPick', 'setProductPicture', 'setIsCropping', 'onFocus']
    return (
      !shallowEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps)) ||
      !shallowEqual(props.productPick, nextProps.productPick)
    )
  })
)(SortableElement(ProductPick))

const ProductPicks = ({
  allowDelete,
  isFormLoading,
  isCropping,
  setIsCropping,
  spotlight,
  onChange,
  setProductPicture,
  onFocus,
}) => (
  <div>
    {spotlight.productPicksAttributes
      .filter(productPick => !productPick._destroy)
      .map((productPick, index) => (
        <SortableProductPick
          allowDelete={allowDelete}
          folded={productPick.id}
          index={index}
          isCropping={isCropping}
          isFormLoading={isFormLoading}
          key={productPick.id || `new-${index}`}
          onChange={onChange}
          onFocus={onFocus}
          personaId={spotlight && spotlight.personaId}
          productPick={productPick}
          setIsCropping={setIsCropping}
          setProductPicture={setProductPicture}
          sortIndex={index}
        />
      ))}
  </div>
)

const ProductPicksContainer = compose(
  withProps(({ spotlight }) => ({ allowDelete: spotlight.productPicksAttributes.length > 1 })),
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange', 'onFocus', 'onSortEnd', 'setIsCropping', 'setProductPicture']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  })
)(SortableContainer(ProductPicks))

const options = { suggestionItem: 'withAvatar' }

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
      dragHandle
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
        onFocus={onFocus}
        options={options}
        required
      />
      <div style={{ marginTop: '24px' }}>
        <FormSection foldable title="Product Picks">
          {spotlight.productPicksAttributes && (
            <ProductPicksContainer
              helperClass="sortable-element"
              isCropping={isCropping}
              isFormLoading={isFormLoading}
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
      selected &&
        onChange(
          {
            ...spotlight,
            personaId: selected.value.id,
            __persona: selected.value,
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
      const filteredProductPicks = spotlight.productPicksAttributes.filter(productPick => !productPick._destroy)
      const orderedProductPicks = arrayMove(filteredProductPicks, oldIndex, newIndex)
      onChange({ ...spotlight, productPicksAttributes: orderedProductPicks }, index)
    },
  })
)(Spotlight)
