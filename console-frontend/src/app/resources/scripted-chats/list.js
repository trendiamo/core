import Avatar from '@material-ui/core/Avatar'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import TableCell from '@material-ui/core/TableCell'
import { apiScriptedChatDestroy, apiScriptedChatList } from 'utils'
import { compose } from 'recompose'

const columns = [{ name: 'persona', padding: 'none', label: 'persona' }]

const ScriptedChatsRow = ({ record }) => (
  <React.Fragment>
    <TableCell component="th" padding="none" scope="row">
      <Avatar alt="" src={record.persona.profilePicUrl} />
    </TableCell>
  </React.Fragment>
)

export default compose(
  enhanceList({
    label: 'ScriptedChats',
    columns,
    api: { fetch: apiScriptedChatList, destroy: apiScriptedChatDestroy },
    routes: { create: routes.scriptedChatCreate, edit: routes.scriptedChatEdit, show: routes.scriptedChatShow },
  })
)(ScriptedChatsRow)
