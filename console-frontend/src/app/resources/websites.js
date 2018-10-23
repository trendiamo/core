import React from 'react'
import routes from 'app/routes'
import Toolbar from '../layout/toolbar-without-delete'
import { ArrayInput, DisabledInput, Edit, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin'

const CustomTextInput = record => <TextInput label={false} source={record.source} type="url" />

const WebsiteEdit = ({ id, ...props }) => (
  <Edit {...props} id={id} title="Account">
    <SimpleForm redirect={routes.account()} toolbar={<Toolbar />}>
      <DisabledInput source="id" />
      <DisabledInput source="name" />
      <TextInput source="title" />
      <TextInput source="subtitle" />
      <ArrayInput source="hostnames">
        <SimpleFormIterator>
          <CustomTextInput />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
)

export default WebsiteEdit
