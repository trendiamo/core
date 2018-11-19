import Button from '@material-ui/core/Button'
import CircularProgress from 'shared/circular-progress'
import Label from 'shared/label'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import PictureUploader, { ProgressBar, uploadImage } from 'shared/picture-uploader'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'
import withForm from 'ext/recompose/with-form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiPersonaShow, apiPersonaUpdate } from 'utils'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'
import { Prompt } from 'react-router'
import { withRouter } from 'react-router'

const EditView = ({
  form,
  isCropping,
  isFormLoading,
  isFormPristine,
  info,
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
      <Notification info={info} />
    </form>
  </PaperContainer>
)

export default compose(
  withRaTitle('Edit Persona'),
  withState('info', 'setInfo', null),
  withState('isCropping', 'setIsCropping', false),
  withState('profilePic', 'setProfilePic', null),
  withState('progress', 'setProgress', null),
  withRouter,
  withHandlers({
    saveFormObject: ({ setInfo, setProgress, profilePic, match }) => async form => {
      // upload the image
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'personas-profile-pics',
        defaultValue: form.profilePicUrl,
      })
      // update user data
      const id = match.params.personaId
      const data = { ...form, profilePicUrl }
      const result = await apiPersonaUpdate(id, { persona: data }, setInfo)
      return result
    },
    afterSave: ({ history }) => result => {
      result && history.push('/')
    },
  }),
  withHandlers({
    loadFormObject: ({ setInfo, match }) => async () => {
      const id = match.params.personaId
      const result = await apiPersonaShow(id, setInfo)
      const resultObject = {
        name: result.name || '',
        description: result.description || '',
        profilePicUrl: result.profilePicUrl || '',
      }
      setInfo(result)
      return resultObject
    },
  }),
  withForm({
    name: '',
    description: '',
    profilePicUrl: '',
  }),
  withHandlers({
    setProfilePicUrl: ({ form, setForm }) => profilePicUrl => {
      setForm({ ...form, profilePicUrl })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(EditView)
