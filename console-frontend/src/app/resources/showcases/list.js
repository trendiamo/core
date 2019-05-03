import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, TableCell, Text } from 'shared/table-elements'
import { apiShowcaseDestroy, apiShowcaseDuplicate, apiShowcaseList } from 'utils'
import { compose } from 'recompose'

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
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
    title: 'Showcases',
    columns,
    defaultSorting: { column: 'active', direction: 'asc' },
    blankState: BlankState,
    buttonText: 'Create new',
    api: { fetch: apiShowcaseList, destroy: apiShowcaseDestroy, duplicate: apiShowcaseDuplicate },
    routes: { create: routes.showcaseCreate, edit: routes.showcaseEdit },
    help: location => ({ single: true, stepName: 'showcases', stageName: 'initial', pathname: location.pathname }),
    highlightInactive: ['triggerIds'],
  })
)(ShowcasesRow)
