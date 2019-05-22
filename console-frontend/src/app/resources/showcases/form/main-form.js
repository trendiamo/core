import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, FormHelperText } from 'shared/form-elements'

const options = { suggestionItem: 'withAvatar' }

const MainForm = ({
  title,
  isCropping,
  setFieldValue,
  onBackClick,
  form,
  isFormLoading,
  selectPersona,
  onToggleContent,
}) => {
  const onFocus = useCallback(() => onToggleContent(false), [onToggleContent])

  const initialSelectedItem = useMemo(() => form.__persona && { value: form.__persona, label: form.__persona.name }, [
    form.__persona,
  ])

  return (
    <Section title={title}>
      <Field
        autoFocus
        disabled={isCropping || isFormLoading}
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
      <FormHelperText>{'The persona will appear in the launcher, and in the cover.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Title"
        margin="normal"
        max={characterLimits.main.title}
        name="title"
        onChange={setFieldValue}
        onFocus={onBackClick}
        required
        value={form.title}
      />
      <FormHelperText>{'The title is shown in the cover.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Subtitle"
        margin="normal"
        max={characterLimits.main.subtitle}
        name="subtitle"
        onChange={setFieldValue}
        onFocus={onBackClick}
        required
        value={form.subtitle}
      />
      <FormHelperText>{'The subtitle is shown in the cover, below the title.'}</FormHelperText>
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Chat Bubble Text"
        margin="normal"
        max={characterLimits.main.chatBubble}
        name="chatBubbleText"
        onChange={setFieldValue}
        onFocus={onFocus}
        value={form.chatBubbleText}
      />
      <FormHelperText>{'Shows as a text bubble next to the plugin launcher.'}</FormHelperText>
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Extra Chat Bubble Text"
        margin="normal"
        max={characterLimits.main.chatBubble}
        name="chatBubbleExtraText"
        onChange={setFieldValue}
        onFocus={onFocus}
        value={form.chatBubbleExtraText}
      />
      <FormHelperText>{'Additional text bubble. Pops up after the first one.'}</FormHelperText>
    </Section>
  )
}

export default MainForm
