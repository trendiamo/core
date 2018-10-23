import { Field } from 'redux-form'
import ProfilePicture from '../../shared/profile-picture'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import {
  Create,
  Datagrid,
  DisabledInput,
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
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
)

export const InfluencerShow = props => (
  <Show {...props} title="Influencer">
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="profilePicUrl" />
    </SimpleShowLayout>
  </Show>
)

export const InfluencersList = ({ ...props }) => (
  <List {...props} title="Influencers">
    <Responsive
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="description" />
          <TextField source="profilePicUrl" />
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
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="profilePicUrl" />
    </SimpleForm>
  </Create>
)
