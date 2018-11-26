import Avatar from '@material-ui/core/Avatar'
import CircularProgress from 'shared/circular-progress'
import enhanceList from 'ext/recompose/enhance-list'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { branch, compose, lifecycle, renderComponent, withState } from 'recompose'
import { TableHead, TableRow, TableToolbar } from 'shared/table-elements'

const columns = [
  { name: 'avatar', padding: 'none', label: 'avatar' },
  { name: 'name', label: 'name', sortable: true },
  { name: 'description', label: 'description' },
]

const PersonasList = ({
  selectedIds,
  handleSelectAll,
  personas,
  handleRequestSort,
  deleteResources,
  handleChangeRowsPerPage,
  setSelectedIds,
  isSelectAll,
  personasCount,
  handleChangePage,
  rowsPerPage,
  page,
  order,
  orderBy,
}) => (
  <PaperContainer>
    <TableToolbar
      deleteResources={deleteResources}
      resourceCreatePath={routes.personaCreate()}
      resourceName="Personas"
      selectedIds={selectedIds}
    />
    <Table aria-labelledby="Personas">
      <TableHead
        columns={columns}
        handleRequestSort={handleRequestSort}
        handleSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        order={order}
        orderBy={orderBy}
        selectedIds={selectedIds}
      />
      <TableBody>
        {personas.map((persona, index) => (
          <TableRow
            handleSelectAll={handleSelectAll}
            index={index}
            key={persona.id}
            resource={persona}
            resourceEditPath={routes.personaEdit(persona.id)}
            resourceShowPath={routes.personaShow(persona.id)}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          >
            <TableCell component="th" padding="none" scope="row">
              <Avatar alt={persona.name} src={persona.profilePicUrl} />
            </TableCell>
            <TableCell component="th" padding="none" scope="row">
              {persona.name}
            </TableCell>
            <TableCell component="th" padding="none" scope="row">
              {persona.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TablePagination
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      component="div"
      count={personasCount}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25]}
    />
  </PaperContainer>
)

export default compose(
  withState('personas', 'setPersonas', []),
  withState('isLoading', 'setIsLoading', true),
  withState('info', 'setInfo', null),
  withState('personasCount', 'setPersonasCount', 0),
  withState('range', 'setRange', []),
  withState('order', 'setOrder', 'asc'),
  withState('orderBy', 'setOrderBy', 'id'),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withState('page', 'setPage', 0),
  withState('rowsPerPage', 'setRowsPerPage', 10),
  enhanceList(apiPersonaList, apiPersonaDestroy, ({ personas, setPersonas, personasCount, setPersonasCount }) => ({
    resources: personas,
    setResources: setPersonas,
    resourcesCount: personasCount,
    setResourcesCount: setPersonasCount,
  })),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setPersonasCount, setQuery, page, setPersonas } = this.props
      const personasResponse = await setQuery(page)
      setPersonas(personasResponse.json)
      setPersonasCount(personasResponse.count)
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(PersonasList)
