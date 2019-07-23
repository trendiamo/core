import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, EnhancedList, TableCell, Text } from 'shared/table-elements'
import { apiOutroDestroy, apiOutroDuplicate, apiOutroList, defaultSorting } from 'utils'
import { personaPicUrl } from 'plugin-base'

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
      <Avatar alt="" disabled={highlightInactive} src={personaPicUrl(record.persona, record.usePersonaAnimation)} />
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

const api = { fetch: apiOutroList, destroy: apiOutroDestroy, duplicate: apiOutroDuplicate }
const outrosRoutes = { create: routes.outroCreate, edit: routes.outroEdit }
const highlightInactive = ['triggerIds']

const OutrosList = () => (
  <EnhancedList
    api={api}
    BlankState={BlankState}
    buttonText="Create new"
    columns={columns}
    defaultSorting={defaultSorting}
    helpStep="outros"
    highlightInactive={highlightInactive}
    ResourceRow={OutrosRow}
    routes={outrosRoutes}
    title="Outros"
  />
)

export default OutrosList
