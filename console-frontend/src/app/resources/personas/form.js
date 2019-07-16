import AddItemButton from 'shared/form-elements/add-item-button'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PictureUploader from 'shared/picture-uploader'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, Field, Form, FormHelperText } from 'shared/form-elements'
import { atLeastOneNonBlankCharInputProps } from 'utils'
import { HelpOutline } from '@material-ui/icons'
import { Tooltip } from '@material-ui/core'
import { useOnboardingConsumer, useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const UploadersContainer = styled.div`
  display: flex;
  width: 100%;
`

const AddAnimationUploaderButton = styled(AddItemButton)`
  align-self: center;
  margin-left: 24px;

  p {
    padding-left: 6px;
    line-height: 1;
  }
  svg {
    font-size: 20px;
  }
`

const AnimationUploaderContainer = styled.div`
  position: relative;
  margin-left: 24px;
`

const AnimationUploaderHelp = styled(HelpOutline)`
  width: 16px;
  fill: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 11px;
  right: 38px;
  z-index: 1;
`

const AnimationUploader = ({ circle, disabled, label, setAnimation, setIsUploaderLoading, value }) => (
  <AnimationUploaderContainer>
    <Tooltip placement="top" title="The animated GIF will appear when moving the mouse over a showcase items">
      <AnimationUploaderHelp />
    </Tooltip>
    <PictureUploader
      circle={circle}
      disabled={disabled}
      label={label}
      onChange={setAnimation}
      setIsUploaderLoading={setIsUploaderLoading}
      type="animationUploader"
      value={value}
    />
  </AnimationUploaderContainer>
)

const formObjectTransformer = json => {
  return {
    id: json.id,
    name: json.name || '',
    description: json.description || '',
    profilePic: { url: json.profilePic.url || '' },
    picRect: json.picRect || {},
    profilePicAnimation: { url: json.profilePicAnimation.url || '' },
    instagramUrl: json.instagramUrl || '',
    lockVersion: json.lockVersion,
  }
}

const PersonaForm = ({ backRoute, history, loadFormObject, location, onboardingCreate, saveFormObject, title }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'personas', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const formRef = useRef()
  const [isCropping, setIsCropping] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    onFormSubmit,
    setFieldValue,
    mergeForm,
    setIsFormSubmitting,
  } = useForm({ formObjectTransformer, loadFormObject, saveFormObject })

  const { onboarding, setOnboarding } = useOnboardingConsumer()

  const newOnFormSubmit = useCallback(
    event => {
      return (async () => {
        if (!formRef.current.reportValidity()) return
        const result = await onFormSubmit(event)
        setIsFormSubmitting(false)
        if (!result || result.error || result.errors) return
        setTimeout(() => {
          if (onboardingCreate && (onboarding.stageIndex < 2 && !onboarding.run)) {
            setOnboarding({ ...onboarding, stageIndex: 1, run: true })
          }
        }, 0)
        if (location.pathname !== routes.personaEdit(result.id)) history.push(routes.personaEdit(result.id))
        return result
      })()
    },
    [history, location.pathname, onFormSubmit, onboarding, onboardingCreate, setIsFormSubmitting, setOnboarding]
  )

  const setPicture = useCallback(
    picture => {
      mergeForm({ profilePic: { url: picture.url }, picRect: picture.picRect })
    },
    [mergeForm]
  )

  const [withAnimationUploader, setWithAnimationUploader] = useState(false)

  const addAnimationUploader = useCallback(() => setWithAnimationUploader(true), [])

  const setAnimation = useCallback(
    animation => {
      mergeForm({ profilePicAnimation: { url: animation.url } })
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
          saveDisabled={isFormSubmitting || isFormLoading || isCropping || isFormPristine || isUploaderLoading}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isCropping, isFormLoading, isFormPristine, isFormSubmitting, isUploaderLoading, newOnFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title={title}>
      <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={newOnFormSubmit}>
        <UploadersContainer>
          <PictureUploader
            aspectRatio={1}
            circle
            disabled={isFormLoading || isCropping || isUploaderLoading}
            label="Picture"
            onChange={setPicture}
            required
            setDisabled={setIsCropping}
            setIsUploaderLoading={setIsUploaderLoading}
            value={{ url: form.profilePic.url, picRect: form.picRect }}
          />
          {withAnimationUploader || form.profilePicAnimation.url ? (
            <AnimationUploader
              circle
              disabled={isFormLoading || isCropping || isUploaderLoading}
              label="Animated Picture"
              setAnimation={setAnimation}
              setIsUploaderLoading={setIsUploaderLoading}
              value={{ url: form.profilePicAnimation.url }}
            />
          ) : (
            <AddAnimationUploaderButton message="Add animation" onClick={addAnimationUploader} />
          )}
        </UploadersContainer>
        <Field
          autoFocus
          disabled={isFormLoading || isCropping || isUploaderLoading}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Name"
          margin="normal"
          max={characterLimits.persona.name}
          name="name"
          onChange={setFieldValue}
          required
          value={form.name}
        />
        <Field
          disabled={isFormLoading || isCropping || isUploaderLoading}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Description"
          margin="normal"
          max={characterLimits.persona.description}
          name="description"
          onChange={setFieldValue}
          required
          value={form.description}
        />
        <FormHelperText>{"A short text that is shown near the persona's name."}</FormHelperText>
        <Field
          disabled={isFormLoading || isCropping || isUploaderLoading}
          fullWidth
          label="Instagram Profile URL"
          margin="normal"
          name="instagramUrl"
          onChange={setFieldValue}
          value={form.instagramUrl}
        />
        <FormHelperText>{"Instagram link icon will appear near the persona's name."}</FormHelperText>
      </Form>
    </Section>
  )
}

export default withRouter(PersonaForm)
