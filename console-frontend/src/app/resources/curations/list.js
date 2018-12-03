import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { apiCurationDestroy, apiCurationList } from 'utils'
import { Avatar, TableCell } from 'shared/table-elements'
import { compose } from 'recompose'

const columns = [
  { name: 'persona', padding: 'none', label: 'persona' },
  { name: 'name', sortable: true, label: 'name' },
]

const CurationsRow = ({ record }) => (
  <React.Fragment>
    <TableCell width="20%">
      <Avatar alt="" src={record.persona.profilePicUrl} />
    </TableCell>
    <TableCell width="80%">{record.name}</TableCell>
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
