import Avatar from '@material-ui/core/Avatar'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import TableCell from '@material-ui/core/TableCell'
import { apiCurationDestroy, apiCurationList } from 'utils'
import { compose } from 'recompose'

const columns = [
  { name: 'persona', padding: 'none', label: 'persona' },
  { name: 'name', sortable: true, label: 'name' },
]

const CurationsRow = ({ record }) => (
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
    breadcrumbs: [{ text: 'Curations' }],
    columns,
    api: { fetch: apiCurationList, destroy: apiCurationDestroy },
    routes: { create: routes.curationCreate, edit: routes.curationEdit },
  })
)(CurationsRow)
