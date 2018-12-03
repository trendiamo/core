import Button from '@material-ui/core/Button'
import CircularProgress from 'shared/circular-progress'
import Label from 'shared/label'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import routes from 'app/routes'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Prompt, withRouter } from 'react-router'

const Actions = ({ isCropping, isFormLoading, onFormSubmit }) => (
  <Button
    color="primary"
    disabled={isFormLoading || isCropping}
    onClick={onFormSubmit}
    type="submit"
    variant="contained"
  >
    <SaveIcon />
    {'Save'}
  </Button>
)

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
  setProfilePicUrl,
}) => (
  <PaperContainer>
    <form onSubmit={onFormSubmit} ref={formRef}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Notification data={errors} />
      <Label>{'Picture'}</Label>
      <PictureUploader
        disabled={isCropping}
        onChange={setProfilePicUrl}
        setDisabled={setIsCropping}
        setProfilePic={setProfilePic}
        value={form.profilePicUrl}
      />
      <TextField
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
      {progress && <ProgressBar progress={progress} />}
    </form>
  </PaperContainer>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('isCropping', 'setIsCropping', false),
  withState('profilePic', 'setProfilePic', null),
  withState('progress', 'setProgress', null),
  withHandlers({
    loadFormObject: ({ loadFormObject }) => async () => {
      return loadFormObject()
    },
    saveFormObject: ({ saveFormObject, setProgress, profilePic, setErrors }) => form => {
      return saveFormObject(form, { setProgress, profilePic, setErrors })
    },
  }),
  withForm({
    name: '',
    description: '',
    profilePicUrl: '',
  }),
  withRouter,
  withHandlers({
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.personasList())
      return result
    },
    setProfilePicUrl: ({ form, setForm }) => profilePicUrl => {
      setForm({ ...form, profilePicUrl })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ breadcrumbs, isCropping, isFormLoading, onFormSubmit }) => ({
    Actions: <Actions isCropping={isCropping} isFormLoading={isFormLoading} onFormSubmit={onFormSubmit} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(PersonaForm)
