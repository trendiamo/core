import Autocomplete from 'shared/autocomplete'
import ProductPicks from './product-picks'
import React, { memo, useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import Tooltip from 'shared/tooltip'
import { AddItemButton, Cancel, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'

const StyledLabel = styled.span`
  display: flex;
  align-items: center;
`

const IconHelp = styled(HelpOutline)`
  font-size: 16px;
  margin-left: 3px;
`

const PersonaLabel = ({ disabled }) => (
  <StyledLabel>
    {'Always show animated picture'}
    <Tooltip
      disabled={disabled}
      placement="top"
      title="Decide whether to always show the persona's animated GIF or just when moving the mouse over an item"
      trigger="click"
    >
      <IconHelp />
    </Tooltip>
  </StyledLabel>
)

const options = { suggestionItem: 'withAvatar' }

const Spotlight = ({
  allowDelete,
  folded,
  index,
  isCropping,
  isFormLoading,
  isUploaderLoading,
  onSpotlightClick,
  setIsCropping,
  setIsUploaderLoading,
  setSpotlightForm,
  spotlight,
}) => {
  const [usePersonaAnimation, setUsePersonaAnimation] = useState(spotlight.usePersonaAnimation)

  const onChange = useCallback(
    newSpotlightCallback => {
      setSpotlightForm(oldSpotlight => ({ ...oldSpotlight, ...newSpotlightCallback(oldSpotlight) }), index)
    },
    [index, setSpotlightForm]
  )

  const selectPersona = useCallback(
    selected => {
      if (selected) {
        onChange(() => ({
          personaId: selected.value.id,
          __persona: selected.value,
          usePersonaAnimation: selected.value.profilePicAnimation.url ? usePersonaAnimation : false,
        }))
      }
    },
    [onChange, usePersonaAnimation]
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
            picture: { url: '' },
            picRect: {},
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
        const newProductPicksAttributes = [...oldSpotlight.productPicksAttributes]
        const productPick = productPickCb(newProductPicksAttributes[productPickIndex])
        if (productPick.id || !productPick._destroy) {
          newProductPicksAttributes[productPickIndex] = productPick
        } else {
          newProductPicksAttributes.splice(productPickIndex, 1)
        }
        return { productPicksAttributes: newProductPicksAttributes }
      })
    },
    [onChange]
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

  const onTogglePersonaAnimation = useCallback(
    () => {
      onChange(() => ({ usePersonaAnimation: !usePersonaAnimation }))
      setUsePersonaAnimation(!usePersonaAnimation)
      onFocus()
    },
    [onChange, onFocus, usePersonaAnimation]
  )

  return (
    <Section>
      <FormSection
        actions={
          allowDelete && (
            <Cancel
              disabled={isCropping || isFormLoading || isUploaderLoading}
              index={index}
              onClick={deleteSpotlight}
            />
          )
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
          autoFocus={index > 0 && !spotlight.id}
          defaultPlaceholder="Choose a persona"
          disabled={isCropping || isFormLoading || isUploaderLoading}
          fullWidth
          initialSelectedItem={initialSelectedItem}
          label="Persona"
          onChange={selectPersona}
          onFocus={onFocus}
          options={options}
          required
        />
        {spotlight.__persona && (
          <FormControlLabel
            control={
              <Checkbox
                checked={spotlight.usePersonaAnimation}
                color="primary"
                disabled={!spotlight.__persona.profilePicAnimation.url}
                name="usePersonaAnimation"
                onChange={onTogglePersonaAnimation}
              />
            }
            disabled={!spotlight.__persona.profilePicAnimation.url}
            label={<PersonaLabel disabled={!spotlight.__persona.profilePicAnimation.url} />}
            title={spotlight.__persona.profilePicAnimation.url ? null : "This persona doesn't have an animated picture"}
          />
        )}
        <div style={{ marginTop: '8px' }}>
          <FormSection foldable title="Product Selection">
            {spotlight.productPicksAttributes && (
              <ProductPicks
                helperClass="sortable-element"
                isCropping={isCropping}
                isFormLoading={isFormLoading}
                isUploaderLoading={isUploaderLoading}
                onFocus={onFocus}
                onSortEnd={onSortEnd}
                personaId={spotlight.personaId}
                productPicksAttributes={spotlight.productPicksAttributes}
                setIsCropping={setIsCropping}
                setIsUploaderLoading={setIsUploaderLoading}
                setProductPickForm={setProductPickForm}
                useDragHandle
              />
            )}
            <AddItemButton
              disabled={isCropping || isFormLoading || isUploaderLoading}
              message="Add Product"
              onClick={addProductPick}
            />{' '}
          </FormSection>
        </div>
      </FormSection>
    </Section>
  )
}

export default memo(Spotlight)
