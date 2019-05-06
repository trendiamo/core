import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useMemo } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, Field, Form, HelperText } from 'shared/form-elements'
import { atLeastOneNonBlankCharRegexp } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Grid } from '@material-ui/core'
import { uploadPicture } from 'shared/picture-uploader'
import { useOnboardingConsumer, useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const PersonaForm = ({
  backRoute,
  form,
  formRef,
  isCropping,
  isFormLoading,
  isFormSubmitting,
  isFormPristine,
  onFormSubmit,
  progress,
  setFieldValue,
  setIsCropping,
  setProfilePic,
  title,
  setProfilePicUrl,
}) => {
  const appBarContent = {
    Actions: (
      <Actions
        isFormPristine={isFormPristine}
        isFormSubmitting={isFormSubmitting}
        onFormSubmit={onFormSubmit}
        saveDisabled={isFormSubmitting || isFormLoading || isCropping || isFormPristine}
        tooltipEnabled
        tooltipText="No changes to save"
      />
    ),
    backRoute,
    title,
  }
  useAppBarContent(appBarContent)
  return (
    <Section title={title}>
      <Grid item sm={6}>
        <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
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
}

const PersonaForm1 = compose(
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
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(PersonaForm)

const PersonaForm2 = props => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()
  return <PersonaForm1 {...props} onboarding={onboarding} setOnboarding={setOnboarding} />
}

const PersonaForm3 = props => {
  const defaultForm = {
    name: '',
    description: '',
    profilePicUrl: '',
    instagramUrl: '',
    profilePicAnimationUrl: '',
  }
  const formProps = useForm({ ...props, defaultForm })
  return <PersonaForm2 {...props} {...formProps} />
}

const PersonaForm4 = compose(
  withProps({ formRef: React.createRef() }),
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
    saveFormObject: ({ saveFormObject, setProgress, profilePic, setProfilePic }) => async form => {
      if (profilePic) {
        const profilePicUrl = await uploadPicture({
          blob: profilePic,
          setProgress,
        })
        setProfilePic(null)
        return saveFormObject({ ...form, profilePicUrl })
      }
      return saveFormObject(form)
    },
  })
)(PersonaForm3)

const PersonaForm5 = props => {
  const { location } = props
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'personas', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)
  return <PersonaForm4 {...props} />
}

export default withRouter(PersonaForm5)
