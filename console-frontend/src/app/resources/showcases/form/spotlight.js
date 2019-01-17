import ProductPick from './product-pick'
import React from 'react'
import Section from 'shared/section'
import Select from 'shared/select'
import styled from 'styled-components'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete, apiProductPickSort } from 'utils'
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { findIndex } from 'lodash'
import { OptionWithAvatar } from 'shared/select-option'
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
  SortableContainer(({ isFormLoading, isCropping, setIsCropping, spotlight, onChange, setProductPicture, onFocus }) => (
    <ProductPicksList>
      {spotlight.productPicksAttributes.map((productPick, productPickIndex) => (
        <SortableProductPick
          allowDelete={spotlight.productPicksAttributes.length > 1}
          index={productPickIndex}
          isCropping={isCropping}
          isFormLoading={isFormLoading}
          key={productPick.id || `new-${productPickIndex}`}
          onChange={onChange}
          onFocus={onFocus}
          productPick={productPick}
          productPickIndex={productPickIndex}
          setIsCropping={setIsCropping}
          setProductPicture={setProductPicture}
        />
      ))}
    </ProductPicksList>
  ))
)

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
  setProductPickForm,
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
      foldable
      folded
      hideTop
      title={`Spotlight #${index + 1}`}
    >
      <Select
        autocomplete={apiPersonasAutocomplete}
        components={{ Option: OptionWithAvatar }}
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
        onFocus={onFocus}
        placeholder="Choose a persona"
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
    onSortEnd: ({ onChange, index, spotlight }) => async ({ oldIndex, newIndex }) => {
      const orderedProductPicks = arrayMove(spotlight.productPicksAttributes, oldIndex, newIndex)
      const orderedIds = orderedProductPicks.map(productPick => productPick.id)
      onChange({ ...spotlight, productPicksAttributes: orderedProductPicks }, index)
      await apiProductPickSort({ ids: orderedIds })
    },
  })
)(Spotlight)
