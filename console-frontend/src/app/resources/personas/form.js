import CircularProgress from 'shared/circular-progress'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, Form } from 'shared/form-elements'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
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
        <TextField
          autoFocus
          disabled={isFormLoading || isCropping}
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          onChange={setFieldValue}
          required
          value={form.name}
        />
        <TextField
          disabled={isFormLoading || isCropping}
          fullWidth
          label="Description"
          margin="normal"
          name="description"
          onChange={setFieldValue}
          required
          value={form.description}
        />
        <FormHelperText>{"A short text that is shown near the persona's name."}</FormHelperText>
        <TextField
          disabled={isFormLoading || isCropping}
          fullWidth
          label="Instagram Profile URL"
          margin="normal"
          name="instagramUrl"
          onChange={setFieldValue}
          value={form.instagramUrl}
        />
        <FormHelperText>{"Instagram link icon will appear near the persona's name."}</FormHelperText>
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
      }
    },
    loadFormObject: ({ loadFormObject }) => async () => {
      return loadFormObject()
    },
    saveFormObject: ({ saveFormObject, setProgress, profilePic, setErrors }) => async form => {
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'personas-profile-pics',
        defaultValue: form.profilePicUrl,
      })
      return saveFormObject({ ...form, profilePicUrl }, { setErrors })
    },
  }),
  withForm({
    name: '',
    description: '',
    profilePicUrl: '',
    instagramUrl: '',
  }),
  withRouter,
  withOnboardingConsumer,
  withHandlers({
    onFormSubmit: ({ formRef, history, onFormSubmit, onboarding, setOnboarding, onboardingCreate }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return
      setTimeout(() => {
        if (onboardingCreate && (onboarding.stageIndex < 2 && !onboarding.run)) {
          setOnboarding({ ...onboarding, stageIndex: 1, run: true })
        }
      }, 0)
      history.push(routes.personasList())
      return result
    },
    setProfilePicUrl: ({ form, setForm }) => profilePicUrl => {
      setForm({ ...form, profilePicUrl })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ breadcrumbs, isCropping, isFormLoading, onFormSubmit, create }) => ({
    Actions: (
      <Actions
        onFormSubmit={onFormSubmit}
        saveClassName={create && 'onboard-create-persona'}
        saveDisabled={isFormLoading || isCropping}
      />
    ),
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(PersonaForm)
