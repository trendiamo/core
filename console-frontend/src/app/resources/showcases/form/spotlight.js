import Autocomplete from 'shared/autocomplete'
import ProductPicks from './product-picks'
import React, { memo, useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import Tooltip from 'shared/tooltip'
import { AddItemButton, Cancel, FormSection, SubSection } from 'shared/form-elements'
import { apiSellersAutocomplete } from 'utils'
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

const SellerLabel = ({ disabled }) => (
  <StyledLabel>
    {'Always show animated image'}
    <Tooltip
      disabled={disabled}
      placement="top"
      title="Decide whether to always show the seller's animated GIF or just when moving the mouse over an item"
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
  const [useSellerAnimation, setUseSellerAnimation] = useState(spotlight.useSellerAnimation)
  const [productPicksCounter, setProductPicksCounter] = useState(spotlight.productPicksAttributes.length)

  const onChange = useCallback(
    newSpotlightCallback => {
      setSpotlightForm(oldSpotlight => ({ ...oldSpotlight, ...newSpotlightCallback(oldSpotlight) }), index)
    },
    [index, setSpotlightForm]
  )

  const selectSeller = useCallback(
    selected => {
      if (selected) {
        onChange(() => ({
          sellerId: selected.value.id,
          __seller: selected.value,
          useSellerAnimation: selected.value.animatedImg.url ? useSellerAnimation : false,
        }))
      }
    },
    [onChange, useSellerAnimation]
  )

  const addProductPick = useCallback(() => {
    onChange(spotlight => ({
      productPicksAttributes: [
        ...spotlight.productPicksAttributes,
        {
          url: '',
          name: '',
          description: '',
          displayPrice: '',
          img: { url: '' },
          imgRect: {},
          __key: `new-${productPicksCounter + 1}`,
        },
      ],
    }))
    setProductPicksCounter(productPicksCounter + 1)
  }, [onChange, productPicksCounter])

  const deleteSpotlight = useCallback(() => {
    onChange(() => ({ _destroy: true }))
  }, [onChange])

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
    () => spotlight.__seller && { value: spotlight.__seller, label: spotlight.__seller.name },
    [spotlight.__seller]
  )

  const onFocus = useCallback(() => {
    onSpotlightClick({ id: spotlight.id || `new-${index}` })
  }, [index, onSpotlightClick, spotlight.id])

  const onToggleSellerAnimation = useCallback(() => {
    onChange(() => ({ useSellerAnimation: !useSellerAnimation }))
    setUseSellerAnimation(!useSellerAnimation)
    onFocus()
  }, [onChange, onFocus, useSellerAnimation])

  return (
    <Section
      actions={
        allowDelete && (
          <Cancel disabled={isCropping || isFormLoading || isUploaderLoading} index={index} onClick={deleteSpotlight} />
        )
      }
      dragHandle
      ellipsizeTitle
      foldable
      folded={folded}
      title={spotlight.id ? `${spotlight.__seller && spotlight.__seller.name}'s Spotlight` : 'New Spotlight'}
    >
      <SubSection>
        <Autocomplete
          autocomplete={apiSellersAutocomplete}
          autoFocus={index > 0 && !spotlight.id}
          defaultPlaceholder="Choose a seller"
          disabled={isCropping || isFormLoading || isUploaderLoading}
          fullWidth
          initialSelectedItem={initialSelectedItem}
          label="Seller"
          name="Seller"
          onChange={selectSeller}
          onFocus={onFocus}
          options={options}
          required
        />
        {spotlight.__seller && (
          <FormControlLabel
            control={
              <Checkbox
                checked={spotlight.useSellerAnimation}
                color="primary"
                disabled={!spotlight.__seller.animatedImg.url}
                name="useSellerAnimation"
                onChange={onToggleSellerAnimation}
              />
            }
            disabled={!spotlight.__seller.animatedImg.url}
            label={<SellerLabel disabled={!spotlight.__seller.animatedImg.url} />}
            title={spotlight.__seller.animatedImg.url ? null : "This seller doesn't have an animated image"}
          />
        )}
      </SubSection>
      <FormSection foldable manualPadding title="Product Selection">
        {spotlight.productPicksAttributes && (
          <ProductPicks
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            isUploaderLoading={isUploaderLoading}
            onFocus={onFocus}
            onSortEnd={onSortEnd}
            productPicksAttributes={spotlight.productPicksAttributes}
            sellerId={spotlight.sellerId}
            setIsCropping={setIsCropping}
            setIsUploaderLoading={setIsUploaderLoading}
            setProductPickForm={setProductPickForm}
          />
        )}
        <SubSection>
          <AddItemButton
            disabled={isCropping || isFormLoading || isUploaderLoading}
            message="Add Product"
            onClick={addProductPick}
          />{' '}
        </SubSection>
      </FormSection>
    </Section>
  )
}

export default memo(Spotlight)
