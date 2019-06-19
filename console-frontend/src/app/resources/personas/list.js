import Avatar from 'shared/table-elements/avatar'
import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { EnhancedList, TableCell } from 'shared/table-elements'
import { imgixUrl, stringifyRect } from 'plugin-base'

const columns = [
  { name: 'id', label: 'id', sortable: true },
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
      <Avatar
        alt={record.name}
        src={imgixUrl(record.profilePicUrl, { rect: stringifyRect(record.picRect) })}
        style={{ marginRight: '0.5rem' }}
      />
    </TableCell>
    <TableCell width="30%">{record.name}</TableCell>
    <TableCell width="70%">{record.description}</TableCell>
  </>
)

const api = { fetch: apiPersonaList, destroy: apiPersonaDestroy }
const personasRoutes = { create: routes.personaCreate, edit: routes.personaEdit }

const PersonasList = () => (
  <EnhancedList
    api={api}
    BlankState={BlankState}
    buttonText="Create new"
    columns={columns}
    helpStep="personas"
    ResourceRow={PersonasRow}
    routes={personasRoutes}
    title="Personas"
  />
)

export default PersonasList
