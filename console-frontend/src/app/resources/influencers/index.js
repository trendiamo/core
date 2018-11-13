import Avatar from '@material-ui/core/Avatar'
import React from 'react'
import styled from 'styled-components'
import Toolbar from 'shared/edit-toolbar'
import validateInfluencer from './influencer-validations'
import { BulkActions } from 'shared/list-actions'
import { compose, withHandlers, withState } from 'recompose'
import {
  Create,
  Edit,
  List,
  Responsive,
  Show,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'
import { Datagrid, EditButton, ShowButton } from 'ext/react-admin'
import { PictureInput } from 'shared/picture-uploader'

const sanitizeProps = props => {
  const newProps = { ...props }
  delete newProps.small
  return newProps
}

const FilteredAvatar = props => <Avatar {...sanitizeProps(props)} />

const StyledAvatar = styled(FilteredAvatar)`
  width: ${({ small }) => (small ? '40px' : '100px')};
  height: ${({ small }) => (small ? '40px' : '100px')};
`

const ProfilePic = ({ record, small }) => <StyledAvatar alt={record.name} small={small} src={record.profilePicUrl} />

const SizedDatagrid = styled(Datagrid)`
  th:nth-child(3),
  td:nth-child(3) {
    width: 20%;
  }

  th:nth-child(4),
  td:nth-child(4) {
    width: 80%;
  }
`

export const InfluencerShow = props => (
  <Show {...props} title="Influencer">
    <SimpleShowLayout>
      <ProfilePic />
      <TextField source="name" />
      <TextField source="description" />
    </SimpleShowLayout>
  </Show>
)

export const InfluencersList = ({ ...props }) => (
  <List {...props} bulkActionButtons={<BulkActions />} title="Influencers">
    <Responsive
      medium={
        <SizedDatagrid>
          <ProfilePic small />
          <TextField source="name" />
          <TextField source="description" />
          <EditButton />
          <ShowButton />
        </SizedDatagrid>
      }
      small={
        <SimpleList
          leftAvatar={record => <Avatar src={record.profilePicUrl} />}
          linkType="show"
          primaryText={record => record.name}
          secondaryText={record => record.description}
        />
      }
    />
  </List>
)

export const CreateView = ({
  setProfilePic,
  profilePic,
  setProfilePicUrl,
  setInputRef,
  isCropping,
  setDisabled,
  disabled,
  ...props
}) => (
  <Create {...props} title="Edit Influencer">
    <SimpleForm
      redirect="show"
      toolbar={
        <Toolbar
          deletable={false}
          disabled={disabled}
          isCropping={isCropping}
          profilePic={profilePic}
          setProfilePicUrl={setProfilePicUrl}
        />
      }
      validate={validateInfluencer}
    >
      <PictureInput
        disabled={disabled}
        label="Picture"
        setDisabled={setDisabled}
        setInputRef={setInputRef}
        setProfilePic={setProfilePic}
        source="profilePicUrl"
      />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
)

export const InfluencersCreate = compose(
  withState('profilePic', 'setProfilePic', null),
  //  Disables the submit button while the image is being cropped.
  withState('disabled', 'setDisabled', false),
  withHandlers(() => {
    let inputRef
    return {
      setInputRef: () => ref => (inputRef = ref),
      setProfilePicUrl: () => value => {
        console.log('setProfilePicUrl', value)
        inputRef.value = value
        inputRef.onChange(value)
      },
    }
  })
)(CreateView)
