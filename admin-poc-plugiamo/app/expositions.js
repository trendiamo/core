import React from 'react'
import { Datagrid, List, TextField } from 'react-admin'

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
