import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PluginPreview from './plugin-preview'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, Field, Form, FormHelperText, PreviewModal } from 'shared/form-elements'
import { apiSellersAutocomplete, atLeastOneNonBlankCharInputProps } from 'utils'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const formObjectTransformer = json => {
  return {
    id: json.id,
    sellerId: (json.seller && json.seller.id) || '',
    useSellerAnimation: json.useSellerAnimation || false,
    name: json.name || '',
    teaserMessage: json.teaserMessage || '',
    chatBubbleButtonYes: json.chatBubbleButtonYes || '',
    chatBubbleButtonNo: json.chatBubbleButtonNo || '',
    triggerIds: json.triggerIds || [],
    lockVersion: json.lockVersion,
    __seller: json.seller,
  }
}

const options = { suggestionItem: 'withAvatar' }

const BaseOutroForm = ({
  formRef,
  form,
  isFormLoading,
  isFormPristine,
  mergeForm,
  onFormSubmit,
  setFieldValue,
  title,
}) => {
  const [useSellerAnimation, setUseSellerAnimation] = useState(form.useSellerAnimation)

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
          autocomplete={apiSellersAutocomplete}
          defaultPlaceholder="Choose a seller"
          disabled={isFormLoading}
          fullWidth
          initialSelectedItem={initialSelectedItem}
          label="Seller"
          name="Seller"
          onChange={selectSeller}
          options={options}
          required
        />
        <FormHelperText>{'The seller will appear in the launcher, and in the content.'}</FormHelperText>
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
          disabled={isFormLoading}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Teaser Message"
          margin="normal"
          max={characterLimits.main.chatBubble}
          name="teaserMessage"
          onChange={setFieldValue}
          required
          value={form.teaserMessage}
        />
        <FormHelperText>{'Question on whether users are satisfied with the help they got.'}</FormHelperText>
        <Field
          disabled={isFormLoading}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="YES Button"
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
          label="NO Button"
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

  const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false)

  const { form, isFormLoading, isFormPristine, isFormSubmitting, mergeForm, onFormSubmit, setFieldValue } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const onPreviewClick = useCallback(
    () => {
      setIsPreviewModalOpened(!isPreviewModalOpened)
    },
    [isPreviewModalOpened]
  )

  const newOnFormSubmit = useCallback(
    async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result || result.error || result.errors) return
      if (location.pathname !== routes.outroEdit(result.id)) history.push(routes.outroEdit(result.id))
      return result
    },
    [formRef, history, location.pathname, onFormSubmit]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          onPreviewClick={onPreviewClick}
          previewEnabled={!!form.id}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, form.id, isFormLoading, isFormPristine, isFormSubmitting, newOnFormSubmit, onPreviewClick, title]
  )
  useAppBarContent(appBarContent)

  const module = useMemo(() => ({ id: form.id, type: 'outro', triggerIds: form.triggerIds }), [form])

  if (isFormLoading) return <CircularProgress />

  return (
    <>
      {form.id && <PreviewModal module={module} open={isPreviewModalOpened} setOpen={setIsPreviewModalOpened} />}
      <Grid container spacing={24}>
        <Grid item md={6} xs={12}>
          <BaseOutroForm
            form={form}
            formRef={formRef}
            isFormLoading={isFormLoading}
            isFormPristine={isFormPristine}
            mergeForm={mergeForm}
            onFormSubmit={newOnFormSubmit}
            setFieldValue={setFieldValue}
            title={title}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <PluginPreview form={form} />
        </Grid>
      </Grid>
    </>
  )
}

export default withRouter(OutroForm)
