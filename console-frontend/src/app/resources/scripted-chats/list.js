import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { apiScriptedChatDestroy, apiScriptedChatList } from 'utils'
import { Avatar, TableCell } from 'shared/table-elements'
import { compose } from 'recompose'

const columns = [
  { name: 'persona', padding: 'none', label: 'persona' },
  { name: 'name', sortable: true, label: 'name' },
]

const ScriptedChatsRow = ({ record }) => (
  <React.Fragment>
    <TableCell width="20%">
      <Avatar alt="" src={record.persona.profilePicUrl} />
    </TableCell>
    <TableCell width="80%">{record.name}</TableCell>
  </React.Fragment>
)

export default compose(
  enhanceList({
    breadcrumbs: [{ text: 'Scripted Chats' }],
    columns,
    api: { fetch: apiScriptedChatList, destroy: apiScriptedChatDestroy },
    routes: { create: routes.scriptedChatCreate, edit: routes.scriptedChatEdit },
  })
)(ScriptedChatsRow)
