import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, FormHelperText } from 'shared/form-elements'

const options = { suggestionItem: 'withAvatar' }

const MainForm = ({
  form,
  isCropping,
  isFormLoading,
  isUploaderLoading,
  onToggleContent,
  selectPersona,
  setFieldValue,
  title,
}) => {
  const onFocus = useCallback(() => onToggleContent(false), [onToggleContent])
  const onTitleFocus = useCallback(() => onToggleContent(true), [onToggleContent])

  const initialSelectedItem = useMemo(() => form.__persona && { value: form.__persona, label: form.__persona.name }, [
    form.__persona,
  ])

  return (
    <Section title={title}>
      <Field
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
        autocomplete={apiPersonasAutocomplete}
        defaultPlaceholder="Choose a persona"
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        initialSelectedItem={initialSelectedItem}
        label="Persona"
        onChange={selectPersona}
        options={options}
        required
      />
      <FormHelperText>{'The persona that will appear for this chat.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Title"
        margin="normal"
        max={characterLimits.main.title}
        name="title"
        onChange={setFieldValue}
        onFocus={onTitleFocus}
        value={form.title}
      />
      <FormHelperText>{'The title will appear at the top of the chat.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        label="Chat Bubble"
        margin="normal"
        max={characterLimits.main.chatBubbleText}
        name="chatBubbleText"
        onChange={setFieldValue}
        onFocus={onFocus}
        value={form.chatBubbleText}
      />
      <FormHelperText>{'Shows as a text bubble next to the plugin launcher.'}</FormHelperText>
      <Field
        disabled={isCropping || isFormLoading || isUploaderLoading}
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
