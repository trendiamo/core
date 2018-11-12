import Button from '@material-ui/core/Button'
import Label from 'shared/label'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import PictureUploader, { ProgressBar, uploadImage } from 'shared/picture-uploader'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'
import withForm from 'ext/recompose/with-form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiInfluencerCreate } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { Prompt } from 'react-router'
import { withRouter } from 'react-router'

const InfluencerCreate = ({
  form,
  info,
  isFormLoading,
  isFormPristine,
  isCropping,
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
      <Button color="primary" disabled={isFormLoading || isCropping} type="submit" variant="contained">
        <SaveIcon />
        {'Save'}
      </Button>
    </form>
  </PaperContainer>
)

export default compose(
  withRaTitle('Create Influencer'),
  withState('info', 'setInfo', null),
  withState('isCropping', 'setIsCropping', false),
  withState('profilePic', 'setProfilePic', null),
  withState('progress', 'setProgress', null),
  withRouter,
  withHandlers({
    saveFormObject: ({ setInfo, setProgress, profilePic }) => async form => {
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'influencers-profile-pics',
      })
      const data = { ...form, profilePicUrl }
      const influencer = await apiInfluencerCreate({ influencer: data }, setInfo)
      return influencer
    },
  }),
  withHandlers({
    afterSave: ({ history }) => result => {
      result && history.push('/')
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        description: '',
        profilePicUrl: '',
      }
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
  })
)(InfluencerCreate)
