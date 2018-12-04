import Avatar from 'shared/table-elements/avatar'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import TableCell from 'shared/table-elements/table-cell'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { compose } from 'recompose'

const columns = [{ name: 'name', label: 'name', sortable: true }, { name: 'description', label: 'description' }]

const PersonasRow = ({ record }) => (
  <React.Fragment>
    <TableCell width="30%">
      <Avatar alt={record.name} src={record.profilePicUrl} style={{ marginRight: '0.5rem' }} />
      {record.name}
    </TableCell>
    <TableCell width="70%">{record.description}</TableCell>
  </React.Fragment>
)

export default compose(
  enhanceList({
    breadcrumbs: [{ text: 'Personas' }],
    columns,
    api: { fetch: apiPersonaList, destroy: apiPersonaDestroy },
    routes: { create: routes.personaCreate, edit: routes.personaEdit },
  })
)(PersonasRow)
