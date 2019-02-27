import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, TableCell, Text } from 'shared/table-elements'
import { apiNavigationDestroy, apiNavigationDuplicate, apiNavigationList } from 'utils'
import { compose } from 'recompose'

const BlankState = () => (
  <BlankStateTemplate
    description={"You have no navigations yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-03.png"
    route={routes.navigationCreate()}
    title="Create a new navigation"
  />
)

const NavigationsRow = ({ record, highlightInactive }) => (
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
    title: 'Navigations',
    columns,
    defaultSorting: { column: 'active', direction: 'asc' },
    blankState: BlankState,
    api: { fetch: apiNavigationList, destroy: apiNavigationDestroy, duplicate: apiNavigationDuplicate },
    routes: { create: routes.navigationCreate, edit: routes.navigationEdit },
    help: { single: true, stepName: 'navigations', stageName: 'initial' },
    highlightInactive: 'triggerIds',
  })
)(NavigationsRow)
