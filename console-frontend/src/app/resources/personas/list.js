import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from 'shared/circular-progress'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FilterListIcon from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableHead from '@material-ui/core/TableHead'
import MUIToolbar from '@material-ui/core/Toolbar'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import ShowIcon from '@material-ui/icons/Visibility'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { apiPersonaDestroy, apiPersonaList } from 'utils'
import { branch, compose, lifecycle, renderComponent, withHandlers, withState } from 'recompose'
import { Link } from 'react-router-dom'

const CheckBoxIcon = styled(MUICheckBoxIcon)`
  color: blue;
`

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`

const SelectedDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`
const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const SelectedTypography = styled(Typography)`
  margin-right: 10px;
  margin-top: 12px;
`

const AddPersonaButton = () => (
  <Button component={Link} size="small" to={routes.personaCreate()}>
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Persona'}</StyledTypography>
  </Button>
)

const columns = [
  { name: 'avatar', numeric: false, disablePadding: true, label: 'avatar' },
  { name: 'name', numeric: false, disablePadding: false, label: 'name' },
  { name: 'description', numeric: false, disablePadding: false, label: 'description' },
]

const TableToolbar = ({ selectedIds, deletePersonas }) => (
  <Toolbar>
    <Typography id="tableTitle" variant="headline">
      {'Personas'}
    </Typography>
    <AddPersonaButton />
    {selectedIds.length > 0 ? (
      <SelectedDiv>
        <SelectedTypography color="inherit" variant="subheading">
          {`${selectedIds.length} selected`}
        </SelectedTypography>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" onClick={deletePersonas}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </SelectedDiv>
    ) : (
      <div>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    )}
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
  setSelectedIds,
  isSelectAll,
}) => (
  <PaperContainer>
    <TableToolbar deletePersonas={deletePersonas} selectedIds={selectedIds} />
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
  </PaperContainer>
)

export default compose(
  withState('personas', 'setPersonas', []),
  withState('isLoading', 'setIsLoading', true),
  withState('info', 'setInfo', null),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withHandlers({
    deletePersonas: ({ selectedIds, setInfo, setIsLoading, setSelectedIds, setPersonas }) => async event => {
      event.preventDefault()
      await apiPersonaDestroy({ ids: selectedIds }, setInfo)
      const personasResponse = await apiPersonaList(setInfo)
      setPersonas(personasResponse)
      setIsLoading(false)
      setSelectedIds([])
    },
    handleSelectAll: ({ setSelectedIds, personas, setIsSelectAll }) => event => {
      setSelectedIds(event.target.checked ? personas.map(persona => persona.id) : [])
      setIsSelectAll(event.target.checked)
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setInfo, setPersonas } = this.props
      const personasResponse = await apiPersonaList(setInfo)
      setPersonas(personasResponse)
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(PersonaList)
