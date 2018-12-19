import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import { apiCurationDestroy, apiCurationList } from 'utils'
import { Avatar, TableCell } from 'shared/table-elements'
import { compose } from 'recompose'

const BlankState = () => (
  <BlankStateTemplate
    description={"You don't have any curations yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-02.png"
    route={routes.curationCreate()}
    title="Create a new curation"
  />
)

const columns = [
  { name: 'persona', padding: 'none', label: 'persona' },
  { name: 'name', sortable: true, label: 'name' },
]

const CurationsRow = ({ record }) => (
  <React.Fragment>
    <TableCell width="20%">
      <Avatar alt="" src={record.persona.profilePicUrl} />
    </TableCell>
    <TableCell width="80%">{record.name}</TableCell>
  </React.Fragment>
)

export default compose(
  enhanceList({
    breadcrumbs: [{ text: 'Curations' }],
    columns,
    blankState: BlankState,
    api: { fetch: apiCurationList, destroy: apiCurationDestroy },
    routes: { create: routes.curationCreate, edit: routes.curationEdit },
    help: { single: true, stepName: 'curations', stageName: 'initial' },
  })
)(CurationsRow)
