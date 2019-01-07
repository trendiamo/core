import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { apiNavigationDestroy, apiNavigationList } from 'utils'
import { Avatar, TableCell, Text } from 'shared/table-elements'
import { compose } from 'recompose'

const BlankState = () => (
  <BlankStateTemplate
    description={"You have no navigations yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-03.png"
    route={routes.navigationCreate()}
    title="Create a new navigation"
  />
)

const columns = [
  { name: 'persona', padding: 'none', label: 'persona' },
  { name: 'name', sortable: true, label: 'name' },
]

const NavigationsRow = ({ record, highlightInactive }) => (
  <React.Fragment>
    <TableCell width="20%">
      <Avatar alt="" disabled={highlightInactive} src={record.persona.profilePicUrl} />
    </TableCell>
    <TableCell width="80%">
      <Text disabled={highlightInactive}>{record.name}</Text>
    </TableCell>
  </React.Fragment>
)

export default compose(
  enhanceList({
    breadcrumbs: [{ text: 'Navigations' }],
    columns,
    blankState: BlankState,
    api: { fetch: apiNavigationList, destroy: apiNavigationDestroy },
    routes: { create: routes.navigationCreate, edit: routes.navigationEdit },
    help: { single: true, stepName: 'navigations', stageName: 'initial' },
    highlightInactive: 'triggerIds',
  })
)(NavigationsRow)
