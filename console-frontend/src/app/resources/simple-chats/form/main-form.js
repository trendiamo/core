import auth from 'auth'
import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import { apiBrandsAutocomplete, apiSellersAutocomplete, atLeastOneNonBlankCharInputProps } from 'utils'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Field, FormHelperText } from 'shared/form-elements'

const sellersAutocompleteOptions = { suggestionItem: 'withAvatar' }
const brandsAutocompleteOptions = { suggestionItem: 'withLogo' }

const MainForm = ({
  form,
  isCropping,
  isFormLoading,
  isUploaderLoading,
  mergeForm,
  onToggleContent,
  setFieldValue,
  title,
}) => {
  const [useSellerAnimation, setUseSellerAnimation] = useState(form.useSellerAnimation)

  const onFocus = useCallback(() => onToggleContent(false), [onToggleContent])
  const onTitleFocus = useCallback(() => onToggleContent(true), [onToggleContent])

  const initialSelectedSeller = useMemo(() => form.__seller && { value: form.__seller, label: form.__seller.name }, [
    form.__seller,
  ])

  const selectSeller = useCallback(
    selected => {
      if (!selected) return
      mergeForm({
        sellerId: selected.value.id,
        __seller: selected.value,
        useSellerAnimation: selected.value.animatedImg.url ? useSellerAnimation : false,
      })
    },
    [mergeForm, useSellerAnimation]
  )

  const onToggleSellerAnimation = useCallback(
    event => {
      setFieldValue(event)
      setUseSellerAnimation(event.target.checked)
    },
    [setFieldValue]
  )

  const initialSelectedBrand = useMemo(() => form.__brand && { value: form.__brand, label: form.__brand.name }, [
    form.__brand,
  ])

  const selectBrand = useCallback(
    selected => {
      if (!selected) return
      mergeForm({
        brandId: selected.value.id,
        __brand: selected.value,
      })
    },
    [mergeForm]
  )

  const sellerIsOwner = useMemo(() => form.__seller && !form.__seller.id, [form.__seller])

  return (
    <Section title={title}>
      <Field
        autoFocus
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Name"
        margin="normal"
        name="name"
        onChange={setFieldValue}
        onFocus={onFocus}
        required
        value={form.name}
      />
      {auth.isSeller() ? (
        <>
          <Autocomplete
            autocomplete={apiBrandsAutocomplete}
            defaultPlaceholder="Choose a brand"
            disabled={title.toLowerCase().startsWith('edit') || isCropping || isFormLoading || isUploaderLoading}
            fullWidth
            initialSelectedItem={initialSelectedBrand}
            label="Brand"
            name="Brand"
            onChange={selectBrand}
            options={brandsAutocompleteOptions}
            required
          />
          <FormHelperText>{'The brand that will be able to use this simple chat.'}</FormHelperText>
        </>
      ) : (
        <>
          <Autocomplete
            autocomplete={apiSellersAutocomplete}
            defaultPlaceholder="Choose a seller"
            disabled={sellerIsOwner || isCropping || isFormLoading || isUploaderLoading}
            fullWidth
            initialSelectedItem={initialSelectedSeller}
            label="Seller"
            name="Seller"
            onChange={selectSeller}
            options={sellersAutocompleteOptions}
            required
          />
          <FormHelperText>{'The seller that will appear for this chat.'}</FormHelperText>
        </>
      )}
      {form.__seller && (
        <FormControlLabel
          control={
            <Checkbox
              checked={form.useSellerAnimation}
              color="primary"
              disabled={!form.__seller.animatedImg.url}
              name="useSellerAnimation"
              onChange={onToggleSellerAnimation}
            />
          }
          disabled={!form.__seller.animatedImg.url}
          label="Use seller's animated image"
          title={form.__seller.animatedImg.url ? null : "This seller doesn't have an animated image"}
        />
      )}
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Heading"
        margin="normal"
        max={characterLimits.main.heading}
        name="heading"
        onChange={setFieldValue}
        onFocus={onTitleFocus}
        value={form.heading}
      />
      <FormHelperText>{'The heading will appear at the top of the chat.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        label="Teaser Message"
        margin="normal"
        max={characterLimits.main.teaserMessage}
        name="teaserMessage"
        onChange={setFieldValue}
        onFocus={onFocus}
        value={form.teaserMessage}
      />
      <FormHelperText>{'Shows as a text bubble next to the plugin launcher.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        label="Extra Teaser Message"
        margin="normal"
        max={characterLimits.main.chatBubble}
        name="extraTeaserMessage"
        onChange={setFieldValue}
        onFocus={onFocus}
        value={form.extraTeaserMessage}
      />
      <FormHelperText>{'Additional text bubble. Pops up after the first one.'}</FormHelperText>
    </Section>
  )
}

export default MainForm
