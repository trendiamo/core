import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, TableCell, Text } from 'shared/table-elements'
import { apiScriptedChatDestroy, apiScriptedChatList } from 'utils'
import { compose } from 'recompose'

const BlankState = () => (
  <BlankStateTemplate
    description={"You don't have any scripted chats yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-01.png"
    route={routes.scriptedChatCreate()}
    title="Create a new scripted chat"
  />
)

const ScriptedChatsRow = ({ record, highlightInactive }) => (
  <React.Fragment>
    <TableCell width="20%">
      <Avatar alt="" disabled={highlightInactive} src={record.persona.profilePicUrl} />
    </TableCell>
    <TableCell width="80%">
      <Text disabled={highlightInactive}>{record.name}</Text>
    </TableCell>
    <ActiveColumn highlightInactive={highlightInactive} />
  </React.Fragment>
)

export default compose(
  enhanceList({
    breadcrumbs: [{ text: 'Scripted Chats' }],
    columns,
    defaultSorting: { column: 'active', direction: 'asc' },
    blankState: BlankState,
    api: { fetch: apiScriptedChatList, destroy: apiScriptedChatDestroy },
    routes: { create: routes.scriptedChatCreate, edit: routes.scriptedChatEdit },
    help: { single: true, stepName: 'scriptedChats', stageName: 'initial' },
    highlightInactive: 'triggerIds',
  })
)(ScriptedChatsRow)
