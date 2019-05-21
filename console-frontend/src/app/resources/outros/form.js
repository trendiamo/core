import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PluginPreview from './plugin-preview'
import React, { useCallback, useMemo, useRef } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, Field, Form } from 'shared/form-elements'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharInputProps } from 'utils'
import { FormHelperText, Grid } from '@material-ui/core'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const formObjectTransformer = json => {
  return {
    id: json.id,
    personaId: (json.persona && json.persona.id) || '',
    name: json.name || '',
    chatBubbleText: json.chatBubbleText || '',
    chatBubbleButtonYes: json.chatBubbleButtonYes || '',
    chatBubbleButtonNo: json.chatBubbleButtonNo || '',
    lockVersion: json.lockVersion,
    __persona: json.persona,
  }
}

const options = { suggestionItem: 'withAvatar' }

const BaseOutroForm = ({
  formRef,
  form,
  setFieldValue,
  selectPersona,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  title,
}) => {
  const initialSelectedItem = useMemo(() => form.__persona && { value: form.__persona, label: form.__persona.name }, [
    form.__persona,
  ])

  return (
    <Section title={title}>
      <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
        <Field
          autoFocus
          disabled={isFormLoading}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Name"
          margin="normal"
          name="name"
          onChange={setFieldValue}
          required
          value={form.name}
        />
        <FormHelperText>{'The name is useful for you to reference this module in a trigger.'}</FormHelperText>
        <Autocomplete
          autocomplete={apiPersonasAutocomplete}
          defaultPlaceholder="Choose a persona"
          disabled={isFormLoading}
          fullWidth
          initialSelectedItem={initialSelectedItem}
          label="Persona"
          onChange={selectPersona}
          options={options}
          required
        />
        <FormHelperText>{'The persona will appear in the launcher, and in the content.'}</FormHelperText>
        <Field
          disabled={isFormLoading}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Chat Bubble Text"
          margin="normal"
          max={characterLimits.main.chatBubble}
          name="chatBubbleText"
          onChange={setFieldValue}
          required
          value={form.chatBubbleText}
        />
        <FormHelperText>{'Question on whether users are satisfied with the help they got.'}</FormHelperText>
        <Field
          disabled={isFormLoading}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Chat Bubble 'YES' Button"
          margin="normal"
          max={characterLimits.main.chatBubbleButton}
          name="chatBubbleButtonYes"
          onChange={setFieldValue}
          required
          value={form.chatBubbleButtonYes}
        />
        <FormHelperText>{'Button that indicates a positive user response.'}</FormHelperText>
        <Field
          disabled={isFormLoading}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Chat Bubble 'NO' Button"
          margin="normal"
          max={characterLimits.main.chatBubbleButton}
          name="chatBubbleButtonNo"
          onChange={setFieldValue}
          required
          value={form.chatBubbleButtonNo}
        />
        <FormHelperText>{'Button that indicates a negative user response.'}</FormHelperText>
      </Form>
    </Section>
  )
}

const OutroForm = ({ backRoute, title, location, history, loadFormObject, saveFormObject }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'outros', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const formRef = useRef(null)

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    mergeForm,
    onFormSubmit,
    setFieldValue,
    setIsFormSubmitting,
  } = useForm({ formObjectTransformer, loadFormObject, saveFormObject })

  const newOnFormSubmit = useCallback(
    event => {
      ;(async () => {
        if (!formRef.current.reportValidity()) return
        const result = await onFormSubmit(event)
        setIsFormSubmitting(false)
        if (!result || result.error || result.errors) return
        if (location.pathname !== routes.outroEdit(result.id)) history.push(routes.outroEdit(result.id))
        return result
      })()
    },
    [formRef, history, location.pathname, onFormSubmit, setIsFormSubmitting]
  )

  const selectPersona = useCallback(
    selected => {
      selected &&
        mergeForm({
          personaId: selected.value.id,
          personaProfilePic: selected.value.profilePicUrl,
        })
    },
    [mergeForm]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isFormLoading, isFormPristine, isFormSubmitting, newOnFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return (
    <Grid container spacing={24}>
      <Grid item md={6} xs={12}>
        <BaseOutroForm
          form={form}
          formRef={formRef}
          isFormLoading={isFormLoading}
          isFormPristine={isFormPristine}
          onFormSubmit={newOnFormSubmit}
          selectPersona={selectPersona}
          setFieldValue={setFieldValue}
          title={title}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <PluginPreview form={form} />
      </Grid>
    </Grid>
  )
}

export default withRouter(OutroForm)
