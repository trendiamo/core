import React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const ExpositionsList = ({ ...props }) => (
  <List {...props}>
    <Datagrid>
      <TextField source="description" />
      <TextField source="ctaText" />
      <TextField source="ctaUrl" />
      <TextField source="domain" />
    </Datagrid>
  </List>
);
