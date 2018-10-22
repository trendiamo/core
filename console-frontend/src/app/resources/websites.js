import React from 'react'
import routes from 'app/routes'
import Toolbar from '../layout/toolbar'
import { DisabledInput, Edit, SelectInput, SimpleForm, TextInput } from 'react-admin'

const WebsiteEdit = ({ id, ...props }) => (
  <Edit {...props} id={id} title="Account">
    <SimpleForm redirect={routes.account()} toolbar={<Toolbar />}>
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
