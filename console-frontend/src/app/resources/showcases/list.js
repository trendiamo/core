import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, columns, EnhancedList, TableCell, Text } from 'shared/table-elements'
import { apiShowcaseDestroy, apiShowcaseDuplicate, apiShowcaseList, defaultSorting } from 'utils'
import { personaPicUrl } from 'plugin-base'

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

const api = { fetch: apiShowcaseList, destroy: apiShowcaseDestroy, duplicate: apiShowcaseDuplicate }
const showcasesRoutes = { create: routes.showcaseCreate, edit: routes.showcaseEdit }
const highlightInactive = ['triggerIds']

const ShowcasesList = () => (
  <EnhancedList
    api={api}
    BlankState={BlankState}
    buttonText="Create new"
    columns={columns}
    defaultSorting={defaultSorting}
    helpStep="showcases"
    highlightInactive={highlightInactive}
    ResourceRow={ShowcasesRow}
    routes={showcasesRoutes}
    title="Showcases"
  />
)

export default ShowcasesList
