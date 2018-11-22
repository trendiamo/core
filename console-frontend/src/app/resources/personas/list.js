import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from 'shared/circular-progress'
import EditIcon from '@material-ui/icons/Edit'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableHead from '@material-ui/core/TableHead'
import MUITableSortLabel from '@material-ui/core/TableSortLabel'
import MUIToolbar from '@material-ui/core/Toolbar'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import ShowIcon from '@material-ui/icons/Visibility'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
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
        <Typography color="inherit" variant="subheading">
          {`${selectedIds.length} selected`}
        </Typography>
      ) : (
        <Typography id="tableTitle" variant="subheading">
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

const StyledTableHead = styled(MUITableHead)`
  background-color: #fafafa;
  border-top: 1px solid #dfe0df;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.3px;
  color: #555;
  text-transform: uppercase;
`
const TableSortLabel = compose(
  withHandlers({
    handleRequestSort: ({ value, onClick }) => () => {
      onClick(value)
    },
  })
)(({ handleRequestSort, ...props }) => <MUITableSortLabel {...props} onClick={handleRequestSort} />)

const TableHead = ({ handleSelectAll, handleRequestSort, isSelectAll, order, orderBy }) => (
  <StyledTableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelectAll} checkedIcon={<CheckBoxIcon />} onClick={handleSelectAll} />
      </TableCell>
      {columns.map(column => {
        return (
          <TableCell key={column.name} numeric={column.numeric} padding={column.disablePadding ? 'none' : 'default'}>
            <Tooltip
              disableFocusListener={column.name === 'avatar'}
              disableHoverListener={column.name === 'avatar'}
              disableTouchListener={column.name === 'avatar'}
              enterDelay={50}
              placement={column.numeric ? 'bottom-end' : 'bottom-start'}
              title={column.name !== 'avatar' && 'sort'}
            >
              <TableSortLabel
                active={orderBy === column.name && column.name !== 'avatar'}
                direction={order}
                onClick={handleRequestSort}
                value={column.name}
              >
                {column.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        )
      })}
      <TableCell key="actions" />
    </TableRow>
  </StyledTableHead>
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
      <Avatar alt={persona.name} src={persona.profilePicUrl} />
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
  personaCount,
  handleChangePage,
  rowsPerPage,
  page,
  order,
  orderBy,
}) => (
  <PaperContainer>
    <EnhancedToolbar deletePersonas={deletePersonas} selectedIds={selectedIds} />
    <Table aria-labelledby="Personas">
      <TableHead
        handleRequestSort={handleRequestSort}
        handleSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        order={order}
        orderBy={orderBy}
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
      count={personaCount}
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
  withState('personaCount', 'setPersonaCount', 0),
  withState('range', 'setRange', []),
  withState('order', 'setOrder', 'asc'),
  withState('orderBy', 'setOrderBy', 'id'),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withState('page', 'setPage', 0),
  withState('rowsPerPage', 'setRowsPerPage', 10),
  withHandlers({
    setQuery: ({ setInfo, rowsPerPage, order, orderBy }) => async page => {
      const query = {
        range: JSON.stringify([page * rowsPerPage, (page + 1) * rowsPerPage - 1]),
        sort: JSON.stringify([orderBy, order]),
      }
      return await apiPersonaList(setInfo, query)
    },
  }),
  withHandlers({
    deletePersonas: ({
      selectedIds,
      setInfo,
      setPersonas,
      setQuery,
      page,
      setPersonaCount,
      setSelectedIds,
    }) => async () => {
      await apiPersonaDestroy({ ids: selectedIds }, setInfo)
      const personasResponse = await setQuery(page)
      setPersonas(personasResponse.json)
      setPersonaCount(personasResponse.count)
      setSelectedIds([])
    },
    handleSelectAll: ({ setSelectedIds, personas, setIsSelectAll }) => event => {
      setSelectedIds(event.target.checked ? personas.map(persona => persona.id) : [])
      setIsSelectAll(event.target.checked)
    },
    handleChangeRowsPerPage: ({ setPersonas, setRowsPerPage, setInfo, order, orderBy }) => async event => {
      const query = { range: JSON.stringify([0, event.target.value - 1]), sort: JSON.stringify([orderBy, order]) }
      const personasResponse = await apiPersonaList(setInfo, query)
      setRowsPerPage(event.target.value)
      setPersonas(personasResponse.json)
    },
    handleChangePage: ({ setPage, setQuery, setPersonas }) => async (event, page) => {
      const personasResponse = await setQuery(page)
      setPersonas(personasResponse.json)
      setPage(page)
    },
    handleRequestSort: ({
      setOrderBy,
      setOrder,
      order,
      orderBy,
      setQuery,
      page,
      setPersonas,
      setPersonaCount,
    }) => async columnName => {
      if (columnName === 'avatar') return
      setOrderBy(columnName)
      setOrder(orderBy === columnName && order === 'desc' ? 'asc' : 'desc')
      const personasResponse = await setQuery(page)
      setPersonas(personasResponse.json)
      setPersonaCount(personasResponse.count)
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setPersonaCount, setQuery, page, setPersonas } = this.props
      const personasResponse = await setQuery(page)
      setPersonas(personasResponse.json)
      setPersonaCount(personasResponse.count)
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(PersonaList)
