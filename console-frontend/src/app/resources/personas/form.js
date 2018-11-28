import Button from '@material-ui/core/Button'
import CircularProgress from 'shared/circular-progress'
import Label from 'shared/label'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'
import withForm from 'ext/recompose/with-form'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'
import { Prompt } from 'react-router'

const PersonaForm = ({
  form,
  info,
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
      <Notification data={info} />
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
  withState('info', 'setInfo', null),
  withState('isCropping', 'setIsCropping', false),
  withState('profilePic', 'setProfilePic', null),
  withState('progress', 'setProgress', null),
  withForm({
    name: '',
    description: '',
    profilePicUrl: '',
  }),
  withHandlers({
    loadFormObject: ({ loadFormObject, setInfo }) => async () => {
      return loadFormObject({ setInfo })
    },
    setProfilePicUrl: ({ form, setForm }) => profilePicUrl => {
      setForm({ ...form, profilePicUrl })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(PersonaForm)
