import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, Field, Form, HelperText } from 'shared/form-elements'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Grid } from '@material-ui/core'
import { uploadImage } from 'shared/picture-uploader'
import { withOnboardingConsumer } from 'ext/recompose/with-onboarding'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const PersonaForm = ({
  form,
  formRef,
  errors,
  isCropping,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  progress,
  setFieldValue,
  setIsCropping,
  setProfilePic,
  title,
  setProfilePicUrl,
}) => (
  <Section title={title}>
    <Grid item sm={6}>
      <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
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
          label="Description"
          margin="normal"
          max={characterLimits.persona.description}
          name="description"
          onChange={setFieldValue}
          required
          value={form.description}
        />
        <HelperText>{"A short text that is shown near the persona's name."}</HelperText>
        <Field
          disabled={isFormLoading || isCropping}
          fullWidth
          label="Instagram Profile URL"
          margin="normal"
          name="instagramUrl"
          onChange={setFieldValue}
          value={form.instagramUrl}
        />
        <HelperText>{"Instagram link icon will appear near the persona's name."}</HelperText>
        <Field
          disabled={isFormLoading || isCropping}
          fullWidth
          label="Animated picture URL"
          margin="normal"
          name="profilePicAnimationUrl"
          onChange={setFieldValue}
          value={form.profilePicAnimationUrl}
        />
        <HelperText>{'Animated GIF will appear when hovering the mouse over the showcase items.'}</HelperText>
        {progress && <ProgressBar progress={progress} />}
      </Form>
    </Grid>
  </Section>
)

export default compose(
  withOnboardingHelp({ single: true, stepName: 'personas', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('isCropping', 'setIsCropping', false),
  withState('profilePic', 'setProfilePic', null),
  withState('progress', 'setProgress', null),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        id: json.id,
        name: json.name || '',
        description: json.description || '',
        profilePicUrl: json.profilePicUrl || '',
        instagramUrl: json.instagramUrl || '',
        profilePicAnimationUrl: json.profilePicAnimationUrl || '',
      }
    },
    loadFormObject: ({ loadFormObject }) => async () => {
      return loadFormObject()
    },
    saveFormObject: ({ saveFormObject, setProgress, profilePic, setErrors, setProfilePic }) => async form => {
      if (profilePic) {
        const profilePicUrl = await uploadImage({
          blob: profilePic,
          setProgress,
          type: 'personas-profile-pics',
        })
        setProfilePic(null)
        return saveFormObject({ ...form, profilePicUrl }, { setErrors })
      }
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    name: '',
    description: '',
    profilePicUrl: '',
    instagramUrl: '',
    profilePicAnimationUrl: '',
  }),
  withRouter,
  withOnboardingConsumer,
  withHandlers({
    onFormSubmit: ({
      formRef,
      history,
      location,
      onFormSubmit,
      onboarding,
      onboardingCreate,
      setOnboarding,
      setIsFormSubmitting,
    }) => async event => {
      if (!formRef.current.reportValidity()) return
      setIsFormSubmitting(true)
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      setTimeout(() => {
        if (onboardingCreate && (onboarding.stageIndex < 2 && !onboarding.run)) {
          setOnboarding({ ...onboarding, stageIndex: 1, run: true })
        }
      }, 0)
      if (location.pathname !== routes.personaEdit(result.id)) history.push(routes.personaEdit(result.id))
      setIsFormSubmitting(false)
      return result
    },
    setProfilePicUrl: ({ form, setForm }) => profilePicUrl => {
      setForm({ ...form, profilePicUrl })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ backRoute, title, create, isCropping, isFormLoading, isFormSubmitting, onFormSubmit }) => ({
    Actions: (
      <Actions
        onFormSubmit={onFormSubmit}
        saveClassName={create && 'onboard-create-persona'}
        saveDisabled={isFormSubmitting || isFormLoading || isCropping}
      />
    ),
    backRoute,
    title,
  }))
)(PersonaForm)
