import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, EnhancedList, TableCell, Text } from 'shared/table-elements'
import { apiShowcaseDestroy, apiShowcaseDuplicate, apiShowcaseList } from 'utils'

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

const ShowcasesList = () => (
  <EnhancedList
    api={{ fetch: apiShowcaseList, destroy: apiShowcaseDestroy, duplicate: apiShowcaseDuplicate }}
    BlankState={BlankState}
    buttonText="Create new"
    columns={columns}
    defaultSorting={{ column: 'active', direction: 'asc' }}
    helpStep="showcases"
    highlightInactive={['triggerIds']}
    ResourceRow={ShowcasesRow}
    routes={{ create: routes.showcaseCreate, edit: routes.showcaseEdit }}
    title="Showcases"
  />
)

export default ShowcasesList
