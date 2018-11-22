import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from 'shared/circular-progress'
import EditIcon from '@material-ui/icons/Edit'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableHead from '@material-ui/core/TableHead'
import MUIToolbar from '@material-ui/core/Toolbar'
import PaperContainer from 'app/layout/paper-container'
import queryString from 'query-string'
import React from 'react'
import routes from 'app/routes'
import ShowIcon from '@material-ui/icons/Visibility'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { branch, compose, lifecycle, renderComponent, withHandlers, withState } from 'recompose'
import { BulkActions } from 'shared/list-actions'
import { Link } from 'react-router-dom'

const CheckBoxIcon = styled(MUICheckBoxIcon)`
  color: blue;
`

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  overflow: hidden;
  white-space: nowrap;
`

const AddPersonaButton = () => (
  <StyledButton color="primary" component={Link} to={routes.personaCreate()} variant="contained">
    {'Create New'}
  </StyledButton>
)

const columns = [
  { name: 'avatar', numeric: false, disablePadding: true, label: 'avatar' },
  { name: 'name', numeric: false, disablePadding: false, label: 'name' },
  { name: 'description', numeric: false, disablePadding: false, label: 'description' },
]

const Title = styled.div`
  flex: 0 0 auto;
`

const Spacer = styled.div`
  flex: 1 1 100%;
`

const EnhancedToolbar = ({ selectedIds, deletePersonas }) => (
  <Toolbar>
    <Title>
      {selectedIds.length > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {`${selectedIds.length} selected`}
        </Typography>
      ) : (
        <Typography id="tableTitle" variant="h6">
          {'Personas'}
        </Typography>
      )}
    </Title>
    <Spacer />
    <div>
      {selectedIds.length > 0 ? (
        <BulkActions deleteBulk={deletePersonas} selectedIds={selectedIds} />
      ) : (
        <AddPersonaButton />
      )}
    </div>
  </Toolbar>
)

const TableHead = ({ handleSelectAll, isSelectAll }) => (
  <MUITableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelectAll} checkedIcon={<CheckBoxIcon />} onClick={handleSelectAll} />
      </TableCell>
      {columns.map(row => {
        return (
          <TableCell key={row.name} numeric={row.numeric} padding={row.disablePadding ? 'none' : 'default'}>
            <Tooltip enterDelay={300} placement={row.numeric ? 'bottom-end' : 'bottom-start'} title="Sort">
              <TableSortLabel value={row.name}>{row.label}</TableSortLabel>
            </Tooltip>
          </TableCell>
        )
      })}
      <TableCell key="actions" />
    </TableRow>
  </MUITableHead>
)

const PersonaRow = compose(
  withHandlers({
    handleSelect: ({ setSelectedIds, selectedIds, persona }) => event => {
      if (event.target.checked) {
        setSelectedIds([...selectedIds, persona.id])
      } else {
        let newIdsToDelete = [...selectedIds]
        newIdsToDelete.splice(selectedIds.indexOf(persona.id), 1)
        setSelectedIds(newIdsToDelete)
      }
    },
  })
)(({ persona, handleSelect, selectedIds }) => (
  <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell padding="checkbox">
      <Checkbox checked={selectedIds.includes(persona.id)} checkedIcon={<CheckBoxIcon />} onChange={handleSelect} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      <Avatar alt="Remy Sharp" src={persona.profilePicUrl} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {persona.name}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {persona.description}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      <Button color="primary" component={Link} to={routes.personaShow(persona.id)}>
        <ShowIcon />
      </Button>
      <Button color="primary" component={Link} to={routes.personaEdit(persona.id)}>
        <EditIcon />
      </Button>
    </TableCell>
  </TableRow>
))

const PersonaList = ({
  selectedIds,
  handleSelectAll,
  personas,
  handleRequestSort,
  deletePersonas,
  handleChangeRowsPerPage,
  setSelectedIds,
  isSelectAll,
  personasCount,
  handleChangePage,
  rowsPerPage,
  page,
}) => (
  <PaperContainer>
    <EnhancedToolbar deletePersonas={deletePersonas} selectedIds={selectedIds} />
    <Table aria-labelledby="Personas">
      <TableHead
        handleRequestSort={handleRequestSort}
        handleSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        personas={personas}
        selectedIds={selectedIds}
      />
      <TableBody>
        {personas.map((persona, index) => (
          <PersonaRow
            handleSelectAll={handleSelectAll}
            index={index}
            key={persona.id}
            persona={persona}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
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
  withState('personasCount', 'setInfluencerCount', 0),
  withState('range', 'setRange', []),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withState('page', 'setPage', 0),
  withState('rowsPerPage', 'setRowsPerPage', 10),
  withHandlers({
    deletePersonas: ({ selectedIds, setInfo, setIsLoading, setSelectedIds, setPersonas }) => async () => {
      await apiPersonaDestroy({ ids: selectedIds }, setInfo)
      const filter = persona => {
        return selectedIds.indexOf(persona.id) === -1
      }
      setPersonas(personas.filter(filter))
      setSelectedIds([])
    },
    handleSelectAll: ({ setSelectedIds, personas, setIsSelectAll }) => event => {
      setSelectedIds(event.target.checked ? personas.map(persona => persona.id) : [])
      setIsSelectAll(event.target.checked)
    },
    handleChangeRowsPerPage: ({ setPersonas, setRowsPerPage, setInfo }) => async event => {
      const personasResponse = await apiPersonaList(
        setInfo,
        queryString.stringify({ range: [0, event.target.value - 1] }, { arrayFormat: 'bracket' })
      )
      setRowsPerPage(event.target.value)
      setPersonas(personasResponse.body.personas)
    },
    handleChangePage: ({ setPage, setInfo, setPersonas, rowsPerPage }) => async (event, page) => {
      const personasResponse = await apiPersonaList(
        setInfo,
        queryString.stringify(
          { range: [page * rowsPerPage, rowsPerPage * page + (rowsPerPage - 1)] },
          { arrayFormat: 'bracket' }
        )
      )
      setPersonas(personasResponse.body.personas)
      setPage(Number(personasResponse.headers.page))
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setInfo, setPersonas, rowsPerPage, setInfluencerCount } = this.props
      const personasResponse = await apiPersonaList(
        setInfo,
        queryString.stringify({ range: [0, rowsPerPage - 1] }, { arrayFormat: 'bracket' })
      )
      setPersonas(personasResponse.body.personas)
      setInfluencerCount(personasResponse.body.count)
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(PersonaList)
