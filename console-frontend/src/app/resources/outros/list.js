import Avatar from '@material-ui/core/Avatar'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import TableCell from '@material-ui/core/TableCell'
import { apiOutroDestroy, apiOutroList } from 'utils'
import { compose } from 'recompose'

const columns = [
  { name: 'persona', padding: 'none', label: 'persona' },
  { name: 'name', sortable: true, label: 'name' },
]

const OutrosRow = ({ record }) => (
  <React.Fragment>
    <TableCell component="th" padding="none" scope="row" style={{ width: '20%' }}>
      <Avatar alt="" src={record.persona.profilePicUrl} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row" style={{ width: '80%' }}>
      {record.name}
    </TableCell>
  </React.Fragment>
)

export default compose(
  enhanceList({
    breadcrumbs: [{ text: 'Outros' }],
    columns,
    api: { fetch: apiOutroList, destroy: apiOutroDestroy },
    routes: { create: routes.outroCreate, edit: routes.outroEdit, show: routes.outroShow },
  })
)(OutrosRow)
