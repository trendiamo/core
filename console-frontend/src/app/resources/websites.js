import React from 'react'
import { DisabledInput, Edit, SelectInput, SimpleForm, TextInput } from 'react-admin'
import routes from '../routes'

const WebsiteEdit = ({ id, ...props }) => (
  <Edit {...props} id={id} title="Account">
    <SimpleForm redirect={routes.account()}>
      <DisabledInput source="id" />
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

export default WebsiteEdit
