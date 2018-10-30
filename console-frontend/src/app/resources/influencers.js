import Avatar from '@material-ui/core/Avatar'
import { PictureInput } from 'shared/picture-uploader'
import React from 'react'
import styled from 'styled-components'
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
    <SimpleForm>
      <PictureInput label="Picture" source="profilePicUrl" type="influencers-profile-pic" />
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
          primaryText={record => record.id}
          secondaryText={record => record.description}
          tertiaryText={record => record.status}
        />
      }
    />
  </List>
)

export const InfluencersCreate = ({ ...props }) => (
  <Create {...props} title="Create Influencer">
    <SimpleForm redirect="show">
      <PictureInput label="Picture" source="profilePicUrl" type="influencers-profile-pic" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
)
