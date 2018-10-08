import React from 'react'
import {
  Create,
  Datagrid,
  DisabledInput,
  Edit,
  EditButton,
  List,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

export const ExpositionShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="description" />
      <TextField source="ctaText" />
      <TextField source="ctaUrl" />
      <TextField source="domain" />
    </SimpleShowLayout>
  </Show>
)

export const ExpositionsList = ({ ...props }) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="description" />
      <TextField source="ctaText" />
      <TextField source="ctaUrl" />
      <TextField source="domain" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ExpositionsEdit = ({ ...props }) => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DisabledInput source="domain" />
      <TextInput source="description" />
      <TextInput source="ctaText" />
      <TextInput source="ctaUrl" />
    </SimpleForm>
  </Edit>
)

export const ExpositionsCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <TextInput source="description" />
      <TextInput source="ctaUrl" />
      <TextInput source="ctaText" />
    </SimpleForm>
  </Create>
)
