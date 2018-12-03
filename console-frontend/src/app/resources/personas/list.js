import Avatar from 'shared/table-elements/avatar'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import TableCell from 'shared/table-elements/table-cell'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { compose } from 'recompose'

const columns = [
  { name: 'avatar', padding: 'none', label: 'avatar' },
  { name: 'name', label: 'name', sortable: true },
  { name: 'description', label: 'description' },
]

const PersonasRow = ({ record }) => (
  <React.Fragment>
    <TableCell>
      <Avatar alt={record.name} src={record.profilePicUrl} />
    </TableCell>
    <TableCell width="20%">{record.name}</TableCell>
    <TableCell width="80%">{record.description}</TableCell>
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
