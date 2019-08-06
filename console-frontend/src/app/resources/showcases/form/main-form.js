import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import { apiSellersAutocomplete, atLeastOneNonBlankCharInputProps } from 'utils'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Field, FormHelperText } from 'shared/form-elements'

const options = { suggestionItem: 'withAvatar' }

const MainForm = ({
  form,
  isCropping,
  isFormLoading,
  isUploaderLoading,
  mergeForm,
  onBackClick,
  onToggleContent,
  setFieldValue,
  title,
}) => {
  const [useSellerAnimation, setUseSellerAnimation] = useState(form.useSellerAnimation)

  const onFocus = useCallback(() => onToggleContent(false), [onToggleContent])

  const initialSelectedItem = useMemo(() => form.__seller && { value: form.__seller, label: form.__seller.name }, [
    form.__seller,
  ])

  const onToggleSellerAnimation = useCallback(
    event => {
      setFieldValue(event)
      setUseSellerAnimation(event.target.checked)
      onToggleContent(false)
    },
    [onToggleContent, setFieldValue]
  )

  const selectSeller = useCallback(
    selected => {
      if (!selected) return
      mergeForm({
        sellerId: selected.value.id,
        __seller: selected.value,
        useSellerAnimation: selected.value.profilePicAnimation.url ? useSellerAnimation : false,
      })
    },
    [mergeForm, useSellerAnimation]
  )

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
      <FormHelperText>{'The name is useful for you to reference this module in a trigger.'}</FormHelperText>
      <Autocomplete
        autocomplete={apiSellersAutocomplete}
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
      <FormHelperText>{'The seller will appear in the launcher, and in the cover.'}</FormHelperText>
      {form.__seller && (
        <FormControlLabel
          control={
            <Checkbox
              checked={form.useSellerAnimation}
              color="primary"
              disabled={!form.__seller.profilePicAnimation.url}
              name="useSellerAnimation"
              onChange={onToggleSellerAnimation}
            />
          }
          disabled={!form.__seller.profilePicAnimation.url}
          label="Use seller's animated picture"
          title={form.__seller.profilePicAnimation.url ? null : "This seller doesn't have an animated picture"}
        />
      )}
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Heading"
        margin="normal"
        max={characterLimits.main.heding}
        name="heading"
        onChange={setFieldValue}
        onFocus={onBackClick}
        required
        value={form.heading}
      />
      <FormHelperText>{'The heading is shown in the cover.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Subheading"
        margin="normal"
        max={characterLimits.main.subheading}
        name="subheading"
        onChange={setFieldValue}
        onFocus={onBackClick}
        required
        value={form.subheading}
      />
      <FormHelperText>{'The subheading is shown in the cover, below the heading.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        label="Teaser Message"
        margin="normal"
        max={characterLimits.main.chatBubble}
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
