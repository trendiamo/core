import Avatar from '@material-ui/core/Avatar'
import { PictureInput } from 'shared/picture-uploader'
import React from 'react'
import styled from 'styled-components'
import validateInfluencer from './influencer-validations'
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Responsive,
  Show,
  ShowButton,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

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

export const InfluencersEdit = ({ ...props }) => (
  <Edit {...props} title="Edit Influencer">
    <SimpleForm validate={validateInfluencer}>
      <PictureInput label="Picture" source="profilePicUrl" type="influencers-profile-pics" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
)

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
  <List {...props} title="Influencers">
    <Responsive
      medium={
        <Datagrid>
          <ProfilePic small />
          <TextField source="name" />
          <TextField source="description" />
          <EditButton />
          <ShowButton />
        </Datagrid>
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

export const InfluencersCreate = ({ ...props }) => (
  <Create {...props} title="Create Influencer">
    <SimpleForm redirect="show" validate={validateInfluencer}>
      <PictureInput label="Picture" source="profilePicUrl" type="influencers-profile-pics" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
)
