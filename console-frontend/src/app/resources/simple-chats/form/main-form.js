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
  onToggleContent,
  setFieldValue,
  title,
}) => {
  const [useSellerAnimation, setUseSellerAnimation] = useState(form.useSellerAnimation)

  const onFocus = useCallback(() => onToggleContent(false), [onToggleContent])
  const onTitleFocus = useCallback(() => onToggleContent(true), [onToggleContent])

  const initialSelectedItem = useMemo(() => form.__seller && { value: form.__seller, label: form.__seller.name }, [
    form.__seller,
  ])

  const onToggleSellerAnimation = useCallback(
    event => {
      setFieldValue(event)
      setUseSellerAnimation(event.target.checked)
    },
    [setFieldValue]
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
      <Autocomplete
        autocomplete={apiSellersAutocomplete}
        defaultPlaceholder="Choose a seller"
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        initialSelectedItem={initialSelectedItem}
        label="Seller"
        name="Seller"
        onChange={selectSeller}
        options={options}
        required
      />
      <FormHelperText>{'The seller that will appear for this chat.'}</FormHelperText>
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
