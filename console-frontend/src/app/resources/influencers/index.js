import Avatar from '@material-ui/core/Avatar'
import React from 'react'
import styled from 'styled-components'
import Toolbar from 'shared/edit-toolbar'
import validateInfluencer from './influencer-validations'
import { BulkActions } from 'shared/list-actions'
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

export const InfluencersEdit = ({ ...props }) => (
  <Edit {...props} title="Edit Influencer">
    <SimpleForm toolbar={<Toolbar />} validate={validateInfluencer}>
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

export const InfluencersCreate = ({ ...props }) => (
  <Create {...props} title="Create Influencer">
    <SimpleForm redirect="show" validate={validateInfluencer}>
      <PictureInput label="Picture" source="profilePicUrl" type="influencers-profile-pics" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
)
