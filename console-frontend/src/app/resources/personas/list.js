import Avatar from '@material-ui/core/Avatar'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import TableCell from '@material-ui/core/TableCell'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { compose } from 'recompose'

const columns = [
  { name: 'avatar', padding: 'none', label: 'avatar' },
  { name: 'name', label: 'name', sortable: true },
  { name: 'description', label: 'description' },
]

const PersonasRow = ({ record }) => (
  <React.Fragment>
    <TableCell component="th" padding="none" scope="row">
      <Avatar alt={record.name} src={record.profilePicUrl} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row" style={{ width: '30%' }}>
      {record.name}
    </TableCell>
    <TableCell component="th" padding="none" scope="row" style={{ width: '70%' }}>
      {record.description}
    </TableCell>
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
