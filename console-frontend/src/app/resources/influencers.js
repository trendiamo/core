import React from 'react'
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

export const InfluencersEdit = ({ ...props }) => (
  <Edit {...props} title="Edit Influencer">
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="profilePicUrl" />
    </SimpleForm>
  </Edit>
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
