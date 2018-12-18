import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { apiScriptedChatDestroy, apiScriptedChatList } from 'utils'
import { Avatar, TableCell } from 'shared/table-elements'
import { compose } from 'recompose'

const BlankState = () => (
  <BlankStateTemplate
    description={"You don't have any scripted chats yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-01.png"
    route={routes.scriptedChatCreate()}
    title="Create a new scripted chat"
  />
)

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
    blankState: BlankState,
    api: { fetch: apiScriptedChatList, destroy: apiScriptedChatDestroy },
    routes: { create: routes.scriptedChatCreate, edit: routes.scriptedChatEdit },
  })
)(ScriptedChatsRow)
