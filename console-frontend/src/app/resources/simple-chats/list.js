import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, TableCell, Text } from 'shared/table-elements'
import { apiSimpleChatDestroy, apiSimpleChatDuplicate, apiSimpleChatList } from 'utils'
import { compose } from 'recompose'

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
  <React.Fragment>
    <TableCell width="20%">
      <Avatar alt="" disabled={highlightInactive} src={record.persona.profilePicUrl} />
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
  </React.Fragment>
)

export default compose(
  enhanceList({
    title: 'Simple Chats',
    columns,
    defaultSorting: { column: 'active', direction: 'asc' },
    blankState: BlankState,
    buttonText: 'Create new',
    api: { fetch: apiSimpleChatList, destroy: apiSimpleChatDestroy, duplicate: apiSimpleChatDuplicate },
    routes: { create: routes.simpleChatCreate, edit: routes.simpleChatEdit },
    help: location => ({ single: true, stepName: 'simpleChats', stageName: 'initial', pathname: location.pathname }),
    highlightInactive: ['triggerIds'],
  })
)(SimpleChatsRow)
