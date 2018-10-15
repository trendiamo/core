import React from 'react'
import { Datagrid, List, TextField } from 'react-admin'

export const VideosList = ({ ...props }) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="status" />
      <TextField source="videoUrl" />
    </Datagrid>
  </List>
)
