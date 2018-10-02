import React from 'react'
import { Create, Datagrid, DisabledInput, Edit, List, SimpleForm, TextField, TextInput } from 'react-admin'

export const ExpositionsList = ({ ...props }) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="description" />
      <TextField source="ctaText" />
      <TextField source="ctaUrl" />
      <TextField source="domain" />
    </Datagrid>
  </List>
)

export const ExpositionsEdit = ({ ...props }) => (
  <Edit title="Edit an exposition" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
)

export const ExpositionsCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="domain" />
      <TextInput source="description" />
      <TextInput source="ctaUrl" />
      <TextInput source="ctaText" />
    </SimpleForm>
  </Create>
)
