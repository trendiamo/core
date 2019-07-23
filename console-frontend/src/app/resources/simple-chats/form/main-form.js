import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharInputProps } from 'utils'
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
  const [usePersonaAnimation, setUsePersonaAnimation] = useState(form.usePersonaAnimation)

  const onFocus = useCallback(() => onToggleContent(false), [onToggleContent])
  const onTitleFocus = useCallback(() => onToggleContent(true), [onToggleContent])

  const initialSelectedItem = useMemo(() => form.__persona && { value: form.__persona, label: form.__persona.name }, [
    form.__persona,
  ])

  const onTogglePersonaAnimation = useCallback(
    event => {
      setFieldValue(event)
      setUsePersonaAnimation(event.target.checked)
    },
    [setFieldValue]
  )

  const selectPersona = useCallback(
    selected => {
      if (!selected) return
      mergeForm({
        personaId: selected.value.id,
        __persona: selected.value,
        usePersonaAnimation: selected.value.profilePicAnimation.url ? usePersonaAnimation : false,
      })
    },
    [mergeForm, usePersonaAnimation]
  )

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
      {form.__persona && (
        <FormControlLabel
          control={
            <Checkbox
              checked={form.usePersonaAnimation}
              color="primary"
              disabled={!form.__persona.profilePicAnimation.url}
              name="usePersonaAnimation"
              onChange={onTogglePersonaAnimation}
            />
          }
          disabled={!form.__persona.profilePicAnimation.url}
          label="Use persona's animated picture"
          title={form.__persona.profilePicAnimation.url ? null : "This persona doesn't have an animated picture"}
        />
      )}
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
