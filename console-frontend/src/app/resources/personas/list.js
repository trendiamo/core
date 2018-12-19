import Avatar from 'shared/table-elements/avatar'
import BlankStateTemplate from 'shared/blank-state'
import enhanceList from 'ext/recompose/enhance-list'
import React from 'react'
import routes from 'app/routes'
import TableCell from 'shared/table-elements/table-cell'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { compose } from 'recompose'

const columns = [{ name: 'name', label: 'name', sortable: true }, { name: 'description', label: 'description' }]

const BlankState = () => (
  <BlankStateTemplate
    description={"You don't have any personas yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-02.png"
    route={routes.personaCreate()}
    title="Create a new persona"
  />
)

const PersonasRow = ({ record }) => (
  <React.Fragment>
    <TableCell width="30%">
      <Avatar alt={record.name} src={record.profilePicUrl} style={{ marginRight: '0.5rem' }} />
      {record.name}
    </TableCell>
    <TableCell width="70%">{record.description}</TableCell>
  </React.Fragment>
)

export default compose(
  enhanceList({
    breadcrumbs: [{ text: 'Personas' }],
    blankState: BlankState,
    columns,
    api: { fetch: apiPersonaList, destroy: apiPersonaDestroy },
    routes: { create: routes.personaCreate, edit: routes.personaEdit },
    help: { single: true, stepName: 'personas', stageName: 'initial' },
  })
)(PersonasRow)
