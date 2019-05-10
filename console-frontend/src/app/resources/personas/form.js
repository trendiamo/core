import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, Field, Form } from 'shared/form-elements'
import { atLeastOneNonBlankCharRegexp } from 'utils'
import { FormHelperText, Grid } from '@material-ui/core'
import { uploadPicture } from 'shared/picture-uploader'
import { useOnboardingConsumer, useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const defaultForm = {
  name: '',
  description: '',
  profilePicUrl: '',
  instagramUrl: '',
  profilePicAnimationUrl: '',
}

const formObjectTransformer = json => {
  return {
    id: json.id,
    name: json.name || '',
    description: json.description || '',
    profilePicUrl: json.profilePicUrl || '',
    instagramUrl: json.instagramUrl || '',
    profilePicAnimationUrl: json.profilePicAnimationUrl || '',
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
  const [profilePic, setProfilePic] = useState(null)
  const [progress, setProgress] = useState(null)

  const newSaveFormObject = useCallback(
    form => {
      return (async () => {
        if (profilePic) {
          const profilePicUrl = await uploadPicture({
            blob: profilePic,
            setProgress,
          })
          setProfilePic(null)
          return saveFormObject({ ...form, profilePicUrl })
        }
        return saveFormObject(form)
      })()
    },
    [profilePic, saveFormObject]
  )

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    onFormSubmit,
    setFieldValue,
    setForm,
    setIsFormSubmitting,
  } = useForm({ formObjectTransformer, defaultForm, loadFormObject, saveFormObject: newSaveFormObject })

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

  const setProfilePicUrl = useCallback(
    profilePicUrl => {
      setForm({ ...form, profilePicUrl })
    },
    [form, setForm]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isCropping || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isCropping, isFormLoading, isFormPristine, isFormSubmitting, newOnFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title={title}>
      <Grid item sm={6}>
        <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={newOnFormSubmit}>
          <PictureUploader
            disabled={isCropping}
            label="Picture"
            onChange={setProfilePicUrl}
            required
            setDisabled={setIsCropping}
            setPic={setProfilePic}
            value={form.profilePicUrl}
          />
          <Field
            autoFocus
            disabled={isFormLoading || isCropping}
            fullWidth
            inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
            label="Name"
            margin="normal"
            max={characterLimits.persona.name}
            name="name"
            onChange={setFieldValue}
            required
            value={form.name}
          />
          <Field
            disabled={isFormLoading || isCropping}
            fullWidth
            inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
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
            disabled={isFormLoading || isCropping}
            fullWidth
            label="Instagram Profile URL"
            margin="normal"
            name="instagramUrl"
            onChange={setFieldValue}
            value={form.instagramUrl}
          />
          <FormHelperText>{"Instagram link icon will appear near the persona's name."}</FormHelperText>
          <Field
            disabled={isFormLoading || isCropping}
            fullWidth
            label="Animated picture URL"
            margin="normal"
            name="profilePicAnimationUrl"
            onChange={setFieldValue}
            value={form.profilePicAnimationUrl}
          />
          <FormHelperText>{'Animated GIF will appear when hovering the mouse over the showcase items.'}</FormHelperText>
          {progress && <ProgressBar progress={progress} />}
        </Form>
      </Grid>
    </Section>
  )
}

export default withRouter(PersonaForm)
