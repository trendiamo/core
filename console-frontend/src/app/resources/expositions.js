import React from 'react'
import StatusField from 'shared/status-field'
import {
  Create,
  Datagrid,
  DisabledInput,
  Edit,
  EditButton,
  List,
  Responsive,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

export const ExpositionShow = props => (
  <Show {...props} title="Exposition">
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="description" />
      <TextField source="ctaText" />
      <TextField source="ctaUrl" />
      <TextField source="domain" />
      <StatusField source="status" />
    </SimpleShowLayout>
  </Show>
)

export const ExpositionsList = ({ ...props }) => (
  <List {...props} title="Expositions">
    <Responsive
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="description" />
          <StatusField source="status" />
          <TextField source="ctaText" />
          <TextField source="ctaUrl" />
          <TextField source="domain" />
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

export const ExpositionsEdit = ({ ...props }) => (
  <Edit {...props} title="Edit Exposition">
    <SimpleForm>
      <DisabledInput source="id" />
      <DisabledInput source="domain" />
      <TextInput source="description" />
      <TextInput source="ctaText" />
      <TextInput source="ctaUrl" />
      <SelectInput
        choices={[
          { id: 'DRAFT', name: 'DRAFT' },
          { id: 'PUBLISHED', name: 'PUBLISHED' },
          { id: 'ARCHIVED', name: 'ARCHIVED' },
        ]}
        label="Status"
        source="status"
      />
    </SimpleForm>
  </Edit>
)

export const ExpositionsCreate = ({ ...props }) => (
  <Create {...props} title="Create Exposition">
    <SimpleForm redirect="show">
      <TextInput source="description" />
      <TextInput source="ctaUrl" />
      <TextInput source="ctaText" />
      <SelectInput
        choices={[
          { id: 'DRAFT', name: 'DRAFT' },
          { id: 'PUBLISHED', name: 'PUBLISHED' },
          { id: 'ARCHIVED', name: 'ARCHIVED' },
        ]}
        label="Status"
        source="status"
      />
    </SimpleForm>
  </Create>
)
