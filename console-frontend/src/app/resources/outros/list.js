import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { apiOutroDestroy, apiOutroList } from 'utils'
import { Avatar, columns, TableCell, Text } from 'shared/table-elements'
import { compose } from 'recompose'

const BlankState = () => (
  <BlankStateTemplate
    description={"You have no outros yet. Let's create the first one?"}
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
  </React.Fragment>
)

export default compose(
  enhanceList({
    breadcrumbs: [{ text: 'Outros' }],
    columns,
    blankState: BlankState,
    api: { fetch: apiOutroList, destroy: apiOutroDestroy },
    routes: { create: routes.outroCreate, edit: routes.outroEdit },
    help: { single: true, stepName: 'outros', stageName: 'initial' },
    highlightInactive: 'triggerIds',
  })
)(OutrosRow)
