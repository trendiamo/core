import CircularProgress from 'shared/circular-progress'
import PictureUploader, { ProgressBar, uploadPicture } from 'shared/picture-uploader'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, Field, Form, Select } from 'shared/form-elements'
import { apiRequest, apiUserCreate, atLeastOneNonBlankCharInputProps } from 'utils'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const formObjectTransformer = json => {
  return {
    id: json.id,
    profilePicUrl: json.profilePicUrl || '',
    firstName: json.firstName || '',
    lastName: json.lastName || '',
    role: json.role || '',
    email: json.email || '',
    password: json.password || '',
    passwordConfirmation: json.passwordConfirmation || '',
    lockVersion: json.lockVersion,
  }
}

const loadFormObject = () => {
  return {
    profilePicUrl: '',
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }
}

const passwordInputProps = { minLength: '6' }
const roleOptions = ['Editor', 'Owner']

const UserCreate = ({ history }) => {
  const { enqueueSnackbar } = useSnackbar()

  const formRef = useRef()
  const [isCropping, setIsCropping] = useState(false)
  const [profilePic, setProfilePic] = useState(null)
  const [progress, setProgress] = useState(null)

  const saveFormObject = useCallback(
    async form => {
      let data
      if (profilePic) {
        const profilePicUrl = await uploadPicture({
          blob: profilePic,
          setProgress,
        })
        data = { ...form, profilePicUrl }
      } else {
        data = form
      }
      if (data.password !== data.passwordConfirmation) {
        enqueueSnackbar("Passwords don't match", { variant: 'error' })
        return
      }
      const { json, errors, requestError } = await apiRequest(apiUserCreate, [{ user: data }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully added user', { variant: 'success' })
      setProfilePic(null)
      return json
    },
    [enqueueSnackbar, profilePic]
  )

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    mergeForm,
    onFormSubmit,
    setFieldValue,
    setIsFormSubmitting,
  } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const newOnFormSubmit = useCallback(
    event => {
      return (async () => {
        if (!formRef.current.reportValidity()) return
        const result = await onFormSubmit(event)
        setIsFormSubmitting(false)
        if (!result || result.error || result.errors) return
        history.push(routes.account())
        return result
      })()
    },
    [history, onFormSubmit, setIsFormSubmitting]
  )

  const setProfilePicUrl = useCallback(
    profilePicUrl => {
      mergeForm({ profilePicUrl })
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
          saveDisabled={isFormSubmitting || isFormLoading || isCropping || isFormPristine}
        />
      ),
      backRoute: routes.account(),
      title: 'Add User',
    }),
    [isCropping, isFormLoading, isFormPristine, isFormSubmitting, newOnFormSubmit]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title="Add User">
      <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={newOnFormSubmit}>
        <PictureUploader
          circle
          disabled={isFormLoading || isCropping}
          label="Picture"
          onChange={setProfilePicUrl}
          setDisabled={setIsCropping}
          setPic={setProfilePic}
          value={form.profilePicUrl}
        />
        {progress && <ProgressBar progress={progress} />}
        <Field
          disabled={isFormLoading || isCropping}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="First Name"
          margin="normal"
          name="firstName"
          onChange={setFieldValue}
          required
          type="text"
          value={form.firstName}
        />
        <Field
          disabled={isFormLoading || isCropping}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Last Name"
          margin="normal"
          name="lastName"
          onChange={setFieldValue}
          required
          type="text"
          value={form.lastName}
        />
        <Select
          disabled={isFormLoading || isCropping}
          fullWidth
          label="Role"
          margin="normal"
          name="role"
          onChange={setFieldValue}
          options={roleOptions}
          required
          value={form.role}
        />
        <Field
          disabled={isFormLoading || isCropping}
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          onChange={setFieldValue}
          required
          type="email"
          value={form.email}
        />
        <Field
          disabled={isFormLoading || isCropping}
          fullWidth
          inputProps={passwordInputProps}
          label="Password"
          margin="normal"
          name="password"
          onChange={setFieldValue}
          required
          type="password"
          value={form.password}
        />
        <Field
          disabled={isFormLoading || isCropping}
          fullWidth
          label="Password Confirmation"
          margin="normal"
          name="passwordConfirmation"
          onChange={setFieldValue}
          required
          type="password"
          value={form.passwordConfirmation}
        />
      </Form>
    </Section>
  )
}

export default withRouter(UserCreate)
