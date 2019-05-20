import Autocomplete from 'shared/autocomplete'
import findIndex from 'lodash.findindex'
import ProductPick from './product-pick'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableProductPick = SortableElement(ProductPick)

const ProductPicks = ({
  isFormLoading,
  isCropping,
  setIsCropping,
  spotlight,
  onChange,
  setProductPicture,
  onFocus,
}) => {
  const allowDelete = useMemo(
    () => spotlight.productPicksAttributes.filter(productPick => !productPick._destroy).length > 1,
    [spotlight.productPicksAttributes]
  )

  return (
    <div>
      {spotlight.productPicksAttributes.map((productPick, index) =>
        productPick._destroy ? null : (
          <SortableProductPick
            allowDelete={allowDelete}
            folded={productPick.id}
            index={index}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            key={productPick.id || productPick.__key}
            onChange={onChange}
            onFocus={onFocus}
            personaId={spotlight && spotlight.personaId}
            productPick={productPick}
            setIsCropping={setIsCropping}
            setProductPicture={setProductPicture}
            sortIndex={index}
          />
        )
      )}
    </div>
  )
}

const ProductPicksContainer = SortableContainer(ProductPicks)

const options = { suggestionItem: 'withAvatar' }

const Spotlight = ({
  allowDelete,
  spotlight,
  isFormLoading,
  folded,
  productPicksPictures,
  setIsCropping,
  setProductPicksPictures,
  index,
  isCropping,
  onChange,
  onFocus,
}) => {
  const selectPersona = useCallback(
    selected => {
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
    [index, onChange, spotlight]
  )

  const addProductPick = useCallback(
    () => {
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
              __key: `new-${spotlight.productPicksAttributes.length}`,
            },
          ],
        },
        index
      )
    },
    [index, onChange, spotlight]
  )

  const deleteSpotlight = useCallback(
    () => {
      onChange(
        {
          ...spotlight,
          id: spotlight.id,
          _destroy: true,
        },
        index
      )
    },
    [index, onChange, spotlight]
  )

  const setProductPickForm = useCallback(
    (productPick, productPickIndex) => {
      let newProductPicksAttributes = [...spotlight.productPicksAttributes]
      newProductPicksAttributes[productPickIndex] = productPick
      onChange({ ...spotlight, productPicksAttributes: newProductPicksAttributes }, index)
    },
    [index, onChange, spotlight]
  )

  const setProductPicture = useCallback(
    (productPickIndex, blob, setProgress) => {
      const picture = { spotlightIndex: index, productPickIndex, blob, setProgress }
      let newProductPicksPictures = [...productPicksPictures]
      const productPickPictureIndex = findIndex(newProductPicksPictures, { spotlightIndex: index, productPickIndex })
      productPickPictureIndex >= 0
        ? newProductPicksPictures.splice(productPickPictureIndex, 1, picture)
        : newProductPicksPictures.push(picture)
      setProductPicksPictures(newProductPicksPictures)
    },
    [index, productPicksPictures, setProductPicksPictures]
  )

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const orderedProductPicks = arrayMove(spotlight.productPicksAttributes, oldIndex, newIndex)
      onChange({ ...spotlight, productPicksAttributes: orderedProductPicks }, index)
    },
    [index, onChange, spotlight]
  )

  if (spotlight._destroy) return null

  return (
    <Section>
      <FormSection
        actions={
          allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteSpotlight} />
        }
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
}

export default Spotlight
