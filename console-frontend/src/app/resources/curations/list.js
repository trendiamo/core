import Avatar from '@material-ui/core/Avatar'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import TableCell from '@material-ui/core/TableCell'
import { apiCurationDestroy, apiCurationList } from 'utils'
import { compose } from 'recompose'

const columns = [{ name: 'persona', padding: 'none', label: 'persona' }]

const CurationsRow = ({ record }) => (
  <React.Fragment>
    <TableCell component="th" padding="none" scope="row" style={{ width: '100%' }}>
      <Avatar alt="" src={record.persona.profilePicUrl} />
    </TableCell>
  </React.Fragment>
)

export default compose(
  enhanceList({
    label: 'Curations',
    columns,
    api: { fetch: apiCurationList, destroy: apiCurationDestroy },
    routes: { create: routes.curationCreate, edit: routes.curationEdit, show: routes.curationShow },
  })
)(CurationsRow)
