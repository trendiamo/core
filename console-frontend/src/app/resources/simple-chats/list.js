import auth from 'auth'
import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, EnhancedList, TableCell, Text } from 'shared/table-elements'
import { apiSimpleChatDestroy, apiSimpleChatDuplicate, apiSimpleChatList, defaultSorting } from 'utils'
import { imgixUrl, stringifyRect } from 'plugin-base'

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description={"You don't have any simple chats yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-01.png"
    route={routes.simpleChatCreate()}
    title="Create a new simple chat"
  />
)

const SimpleChatsRow = ({ record, highlightInactive }) => (
  <>
    <TableCell width="20%">
      <Avatar
        alt=""
        disabled={highlightInactive}
        src={imgixUrl(record.persona.profilePic.url, { rect: stringifyRect(record.persona.picRect) })}
      />
    </TableCell>
    <TableCell width="80%">
      <Text disabled={highlightInactive}>{record.name}</Text>
    </TableCell>
    <ActiveColumn
      highlightInactive={highlightInactive}
      symbolTextActive="Active"
      symbolTextInactive="Draft"
      tooltipTextActive="Already used in Triggers"
      tooltipTextInactive="Not yet used in Triggers"
    />
  </>
)

const api = { fetch: apiSimpleChatList, destroy: apiSimpleChatDestroy, duplicate: apiSimpleChatDuplicate }
const simpleChatsRoutes = { create: routes.simpleChatCreate, edit: routes.simpleChatEdit }
const highlightInactive = ['triggerIds']
const canEditResource = resource => !auth.isRole('editor') || resource.triggerIds.length < 1

const SimpleChatsList = () => (
  <EnhancedList
    api={api}
    BlankState={BlankState}
    buttonText="Create new"
    canEditResource={canEditResource}
    columns={columns}
    defaultSorting={defaultSorting}
    helpStep="simpleChats"
    highlightInactive={highlightInactive}
    ResourceRow={SimpleChatsRow}
    routes={simpleChatsRoutes}
    title="Simple Chats"
  />
)

export default SimpleChatsList
