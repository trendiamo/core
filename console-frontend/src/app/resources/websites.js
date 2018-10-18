import React from 'react'
import { DisabledInput, Edit, SelectInput, SimpleForm, TextInput } from 'react-admin'

export const WebsiteEdit = ({ ...props }) => (
  <Edit {...props} title={`Account`}>
    <SimpleForm>
      <DisabledInput source="name" />
      <TextInput source="title" />
      <TextInput source="subtitle" />
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
