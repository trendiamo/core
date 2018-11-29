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
import withForm from 'ext/recompose/with-form'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'
import { Prompt } from 'react-router'
import { withRouter } from 'react-router'

const PersonaForm = ({
  form,
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
    <form onSubmit={onFormSubmit}>
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
      <div style={{ marginTop: '1rem' }}>
        <Button color="primary" disabled={isFormLoading || isCropping} type="submit" variant="contained">
          <SaveIcon />
          {'Save'}
        </Button>
      </div>
    </form>
  </PaperContainer>
)

export default compose(
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
    onFormSubmit: ({ history, onFormSubmit }) => async event => {
      const result = await onFormSubmit(event)
      result && history.push(routes.personasList())
      return result
    },
    setProfilePicUrl: ({ form, setForm }) => profilePicUrl => {
      setForm({ ...form, profilePicUrl })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(PersonaForm)
