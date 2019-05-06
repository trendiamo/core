import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, EnhancedList, TableCell, Text } from 'shared/table-elements'
import { apiOutroDestroy, apiOutroDuplicate, apiOutroList } from 'utils'

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description="You have no outros yet. Let's create the first one?"
    imageSource="/img/background/img-empty-03.png"
    route={routes.outroCreate()}
    title="Create a new outro"
  />
)

const OutrosRow = ({ record, highlightInactive }) => (
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

const OutrosList = () => (
  <EnhancedList
    api={{ fetch: apiOutroList, destroy: apiOutroDestroy, duplicate: apiOutroDuplicate }}
    BlankState={BlankState}
    buttonText="Create new"
    columns={columns}
    defaultSorting={{ column: 'active', direction: 'asc' }}
    helpStep="outros"
    highlightInactive={['triggerIds']}
    ResourceRow={OutrosRow}
    routes={{ create: routes.outroCreate, edit: routes.outroEdit }}
    title="Outros"
  />
)

export default OutrosList
