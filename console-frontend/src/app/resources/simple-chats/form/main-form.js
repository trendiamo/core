import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import React from 'react'
import Section from 'shared/section'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharRegexp } from 'utils'
import { Field } from 'shared/form-elements'
import { FormHelperText } from '@material-ui/core'

const options = { suggestionItem: 'withAvatar' }

const MainForm = ({ title, isFormLoading, form, setFieldValue, selectPersona, onToggleContent }) => (
  <Section title={title}>
    <Field
      disabled={isFormLoading}
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
    <Autocomplete
      autocomplete={apiPersonasAutocomplete}
      defaultPlaceholder="Choose a persona"
      disabled={isFormLoading}
      fullWidth
      initialSelectedItem={form.__persona && { value: form.__persona, label: form.__persona.name }}
      label="Persona"
      onChange={selectPersona}
      options={options}
      required
    />
    <FormHelperText>{'The persona that will appear for this chat.'}</FormHelperText>
    <Field
      disabled={isFormLoading}
      fullWidth
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
      label="Title"
      margin="normal"
      max={characterLimits.main.title}
      name="title"
      onChange={setFieldValue}
      onFocus={() => onToggleContent(true)}
      required
      value={form.title}
    />
    <FormHelperText>{'The title will appear at the top of the chat.'}</FormHelperText>
    <Field
      disabled={isFormLoading}
      fullWidth
      label="Chat Bubble"
      margin="normal"
      max={characterLimits.main.chatBubbleText}
      name="chatBubbleText"
      onChange={setFieldValue}
      onFocus={() => onToggleContent(false)}
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
      onFocus={() => onToggleContent(false)}
      value={form.chatBubbleExtraText}
    />
    <FormHelperText>{'Additional text bubble. Pops up after the first one.'}</FormHelperText>
  </Section>
)

export default MainForm
