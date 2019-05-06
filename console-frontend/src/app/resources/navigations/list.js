import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, EnhancedList, TableCell, Text } from 'shared/table-elements'
import { apiNavigationDestroy, apiNavigationDuplicate, apiNavigationList } from 'utils'

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description="You have no navigations yet. Let's create the first one?"
    imageSource="/img/background/img-empty-03.png"
    route={routes.navigationCreate()}
    title="Create a new navigation"
  />
)

const NavigationsRow = ({ record, highlightInactive }) => (
  <>
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
  </>
)

const NavigationsList = () => (
  <EnhancedList
    api={{ fetch: apiNavigationList, destroy: apiNavigationDestroy, duplicate: apiNavigationDuplicate }}
    BlankState={BlankState}
    buttonText="Create new"
    columns={columns}
    defaultSorting={{ column: 'active', direction: 'asc' }}
    helpStep="navigations"
    highlightInactive={['triggerIds']}
    ResourceRow={NavigationsRow}
    routes={{ create: routes.navigationCreate, edit: routes.navigationEdit }}
    title="Navigations"
  />
)

export default NavigationsList
