import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import React, { memo } from 'react'
import Section from 'shared/section'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharRegexp } from 'utils'
import { Field, HelperText } from 'shared/form-elements'
import { isEqual, omit } from 'lodash'

const options = { suggestionItem: 'withAvatar' }

const MainFormTemplate = ({
  title,
  isCropping,
  setFieldValue,
  onBackClick,
  form,
  isFormLoading,
  selectPersona,
  onToggleContent,
}) => (
  <Section title={title}>
    <Field
      autoFocus
      disabled={isCropping || isFormLoading}
      fullWidth
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
      label="Name"
      margin="normal"
      name="name"
      onChange={setFieldValue}
      onFocus={() => onToggleContent(false)}
      required
      value={form.name}
    />
    <HelperText>{'The name is useful for you to reference this module in a trigger.'}</HelperText>
    <Autocomplete
      autocomplete={apiPersonasAutocomplete}
      defaultPlaceholder="Choose a persona"
      disabled={isCropping || isFormLoading}
      fullWidth
      initialSelectedItem={form.__persona && { value: form.__persona, label: form.__persona.name }}
      label="Persona"
      onChange={selectPersona}
      onFocus={() => onToggleContent(false)}
      options={options}
      required
    />
    <HelperText>{'The persona will appear in the launcher, and in the cover.'}</HelperText>
    <Field
      disabled={isCropping || isFormLoading}
      fullWidth
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
      label="Title"
      margin="normal"
      max={characterLimits.main.title}
      name="title"
      onChange={setFieldValue}
      onFocus={onBackClick}
      required
      value={form.title}
    />
    <HelperText>{'The title is shown in the cover.'}</HelperText>
    <Field
      disabled={isCropping || isFormLoading}
      fullWidth
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
      label="Subtitle"
      margin="normal"
      max={characterLimits.main.subtitle}
      name="subtitle"
      onChange={setFieldValue}
      onFocus={onBackClick}
      required
      value={form.subtitle}
    />
    <HelperText>{'The subtitle is shown in the cover, below the title.'}</HelperText>
    <Field
      disabled={isFormLoading}
      fullWidth
      label="Chat Bubble Text"
      margin="normal"
      max={characterLimits.main.chatBubble}
      name="chatBubbleText"
      onChange={setFieldValue}
      onFocus={() => onToggleContent(false)}
      value={form.chatBubbleText}
    />
    <HelperText>{'Shows as a text bubble next to the plugin launcher.'}</HelperText>
    <Field
      disabled={isFormLoading}
      fullWidth
      label="Extra Chat Bubble Text"
      margin="normal"
      max={characterLimits.main.chatBubble}
      name="chatBubbleExtraText"
      onChange={setFieldValue}
      onFocus={() => onToggleContent(false)}
      value={form.chatBubbleExtraText}
    />
    <HelperText>{'Additional text bubble. Pops up after the first one.'}</HelperText>
  </Section>
)

const MainForm = memo(MainFormTemplate, (props, nextProps) => {
  const ignoreProps = ['setFieldValue', 'selectPersona', 'onBackClick']
  return isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
})

export default MainForm
