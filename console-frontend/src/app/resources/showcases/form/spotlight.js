import Autocomplete from 'shared/autocomplete'
import findIndex from 'lodash.findindex'
import ProductPicks from './product-picks'
import React, { memo, useCallback, useMemo } from 'react'
import Section from 'shared/section'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { arrayMove } from 'react-sortable-hoc'

const options = { suggestionItem: 'withAvatar' }

const Spotlight = ({
  allowDelete,
  folded,
  index,
  isCropping,
  isFormLoading,
  onSpotlightClick,
  productPicksPictures,
  setIsCropping,
  setProductPicksPictures,
  setSpotlightForm,
  spotlight,
}) => {
  const onChange = useCallback(
    newSpotlightCallback => {
      setSpotlightForm(oldSpotlight => ({ ...oldSpotlight, ...newSpotlightCallback(oldSpotlight) }), index)
    },
    [index, setSpotlightForm]
  )

  const selectPersona = useCallback(
    selected => {
      selected &&
        onChange(() => ({
          personaId: selected.value.id,
          __persona: selected.value,
        }))
    },
    [onChange]
  )

  const addProductPick = useCallback(
    () => {
      onChange(spotlight => ({
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
      }))
    },
    [onChange]
  )

  const deleteSpotlight = useCallback(
    () => {
      onChange(() => ({ _destroy: true }))
    },
    [onChange]
  )

  const setProductPickForm = useCallback(
    (productPickCb, productPickIndex) => {
      onChange(oldSpotlight => {
        let newProductPicksAttributes = [...oldSpotlight.productPicksAttributes]
        newProductPicksAttributes[productPickIndex] = productPickCb(newProductPicksAttributes[productPickIndex])
        return { productPicksAttributes: newProductPicksAttributes }
      })
    },
    [onChange]
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
      setSpotlightForm(oldSpotlight => {
        const orderedProductPicks = arrayMove(oldSpotlight.productPicksAttributes, oldIndex, newIndex)
        return { ...oldSpotlight, productPicksAttributes: orderedProductPicks }
      }, index)
    },
    [index, setSpotlightForm]
  )

  const initialSelectedItem = useMemo(
    () => spotlight.__persona && { value: spotlight.__persona, label: spotlight.__persona.name },
    [spotlight.__persona]
  )

  const onFocus = useCallback(
    () => {
      onSpotlightClick({ id: spotlight.id || `new-${index}` })
    },
    [index, onSpotlightClick, spotlight.id]
  )

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
          initialSelectedItem={initialSelectedItem}
          label="Persona"
          onChange={selectPersona}
          onFocus={onFocus}
          options={options}
          required
        />
        <div style={{ marginTop: '24px' }}>
          <FormSection foldable title="Product Picks">
            {spotlight.productPicksAttributes && (
              <ProductPicks
                helperClass="sortable-element"
                isCropping={isCropping}
                isFormLoading={isFormLoading}
                onFocus={onFocus}
                onSortEnd={onSortEnd}
                personaId={spotlight.personaId}
                productPicksAttributes={spotlight.productPicksAttributes}
                setIsCropping={setIsCropping}
                setProductPickForm={setProductPickForm}
                setProductPicture={setProductPicture}
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

export default memo(Spotlight)
