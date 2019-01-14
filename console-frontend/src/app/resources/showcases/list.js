import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, TableCell, Text } from 'shared/table-elements'
import { apiShowcaseDestroy, apiShowcaseList } from 'utils'
import { compose } from 'recompose'

const BlankState = () => (
  <BlankStateTemplate
    description={"You don't have any showcases yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-02.png"
    route={routes.showcaseCreate()}
    title="Create a new showcase"
  />
)

const ShowcasesRow = ({ record, highlightInactive }) => (
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
    breadcrumbs: [{ text: 'Showcases' }],
    columns,
    blankState: BlankState,
    api: { fetch: apiShowcaseList, destroy: apiShowcaseDestroy },
    routes: { create: routes.showcaseCreate, edit: routes.showcaseEdit },
    help: { single: true, stepName: 'showcases', stageName: 'initial' },
    highlightInactive: 'triggerIds',
  })
)(ShowcasesRow)
