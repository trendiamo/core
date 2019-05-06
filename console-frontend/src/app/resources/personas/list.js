import Avatar from 'shared/table-elements/avatar'
import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { EnhancedList, TableCell } from 'shared/table-elements'

const columns = [
  { name: 'avatar' },
  { name: 'name', label: 'name', sortable: true },
  { name: 'description', label: 'description' },
]

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description={"You don't have any personas yet. Let's create the first one?"}
    imageSource="/img/background/img-empty-02.png"
    route={routes.personaCreate()}
    title="Create a new persona"
  />
)

const PersonasRow = ({ record }) => (
  <>
    <TableCell>
      <Avatar alt={record.name} src={record.profilePicUrl} style={{ marginRight: '0.5rem' }} />
    </TableCell>
    <TableCell width="30%">{record.name}</TableCell>
    <TableCell width="70%">{record.description}</TableCell>
  </>
)

const PersonasList = () => (
  <EnhancedList
    api={{ fetch: apiPersonaList, destroy: apiPersonaDestroy }}
    BlankState={BlankState}
    buttonText="Create new"
    columns={columns}
    helpStep="personas"
    ResourceRow={PersonasRow}
    routes={{ create: routes.personaCreate, edit: routes.personaEdit }}
    title="Personas"
  />
)

export default PersonasList
