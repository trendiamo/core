import Avatar from '@material-ui/core/Avatar'
import { Field } from 'redux-form'
import ProfilePicture from '../../shared/profile-picture'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
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

const StyledAvatar = styled(Avatar)`
  width: ${({ small }) => (small ? '40px' : '100px')};
  height: ${({ small }) => (small ? '40px' : '100px')};
`
const ProfilePic = ({ record, small }) => <StyledAvatar alt={record.name} small={small} src={record.profilePicUrl} />

const FieldPic = ({ picValue, setPicture }) => <ProfilePicture onChange={setPicture} value={picValue} />

const EnhancedProfilePic = compose(
  withState('picValue', 'setPicValue', ({ input }) => input.value),
  withHandlers({
    setPicture: ({ input, setPicValue }) => value => {
      setPicValue(value)
      input.onChange(value)
    },
  })
)(FieldPic)

const ProfilePicInput = ({ source }) => <Field component={EnhancedProfilePic} label="picture" name={source} />

export const InfluencersEdit = ({ ...props }) => (
  <Edit {...props} title="Edit Influencer">
    <SimpleForm>
      <ProfilePicInput source="profilePicUrl" />
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
      <ProfilePicInput source="profilePicUrl" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
)
