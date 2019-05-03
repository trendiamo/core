import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, TableCell, Text } from 'shared/table-elements'
import { apiOutroDestroy, apiOutroDuplicate, apiOutroList } from 'utils'
import { compose } from 'recompose'

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
    title: 'Outros',
    columns,
    defaultSorting: { column: 'active', direction: 'asc' },
    blankState: BlankState,
    buttonText: 'Create new',
    api: { fetch: apiOutroList, destroy: apiOutroDestroy, duplicate: apiOutroDuplicate },
    routes: { create: routes.outroCreate, edit: routes.outroEdit },
    help: location => ({ single: true, stepName: 'outros', stageName: 'initial', pathname: location.pathname }),
    highlightInactive: ['triggerIds'],
  })
)(OutrosRow)
