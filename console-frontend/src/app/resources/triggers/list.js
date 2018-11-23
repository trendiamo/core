import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from 'shared/circular-progress'
import EditIcon from '@material-ui/icons/Edit'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableHead from '@material-ui/core/TableHead'
import MUIToolbar from '@material-ui/core/Toolbar'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import ShowIcon from '@material-ui/icons/Visibility'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { apiTriggerDestroy, apiTriggerList } from 'utils'
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

const AddTriggerButton = () => (
  <StyledButton color="primary" component={Link} disabled to="" variant="contained">
    {'Create New'}
  </StyledButton>
)

const columns = [
  { name: 'order', numeric: true, disablePadding: false, label: 'order' },
  { name: 'flowType', numeric: false, disablePadding: false, label: 'flow type' },
  { name: 'flowId', numeric: false, disablePadding: true, label: 'flow id' },
]

const Title = styled.div`
  flex: 0 0 auto;
`

const Spacer = styled.div`
  flex: 1 1 100%;
`

const EnhancedToolbar = ({ selectedIds, deleteTriggers }) => (
  <Toolbar>
    <Title>
      {selectedIds.length > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {`${selectedIds.length} selected`}
        </Typography>
      ) : (
        <Typography id="tableTitle" variant="h6">
          {'Triggers'}
        </Typography>
      )}
    </Title>
    <Spacer />
    <div>
      {selectedIds.length > 0 ? (
        <BulkActions deleteBulk={deleteTriggers} selectedIds={selectedIds} />
      ) : (
        <AddTriggerButton />
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

const TableHead = ({ handleSelectAll, isSelectAll }) => (
  <StyledTableHead>
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
  </StyledTableHead>
)

const TriggerRow = compose(
  withHandlers({
    handleSelect: ({ setSelectedIds, selectedIds, trigger }) => event => {
      if (event.target.checked) {
        setSelectedIds([...selectedIds, trigger.id])
      } else {
        let newIdsToDelete = [...selectedIds]
        newIdsToDelete.splice(selectedIds.indexOf(trigger.id), 1)
        setSelectedIds(newIdsToDelete)
      }
    },
  })
)(({ trigger, handleSelect, selectedIds }) => (
  <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell padding="checkbox">
      <Checkbox checked={selectedIds.includes(trigger.id)} checkedIcon={<CheckBoxIcon />} onChange={handleSelect} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {trigger.order}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {trigger.flowType}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {trigger.flowId}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      <Button color="primary" component={Link} disabled to="">
        <ShowIcon />
      </Button>
      <Button color="primary" component={Link} disabled to="">
        <EditIcon />
      </Button>
    </TableCell>
  </TableRow>
))

const TriggerList = ({
  selectedIds,
  handleSelectAll,
  triggers,
  handleRequestSort,
  deleteTriggers,
  setSelectedIds,
  isSelectAll,
}) => (
  <PaperContainer>
    <EnhancedToolbar deleteTriggers={deleteTriggers} selectedIds={selectedIds} />
    <Table aria-labelledby="Triggers">
      <TableHead
        handleRequestSort={handleRequestSort}
        handleSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        selectedIds={selectedIds}
        triggers={triggers}
      />
      <TableBody>
        {triggers.map((trigger, index) => (
          <TriggerRow
            handleSelectAll={handleSelectAll}
            index={index}
            key={trigger.id}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            trigger={trigger}
          />
        ))}
      </TableBody>
    </Table>
  </PaperContainer>
)

export default compose(
  withState('triggers', 'setTriggers', []),
  withState('isLoading', 'setIsLoading', true),
  withState('info', 'setInfo', null),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withHandlers({
    deleteTriggers: ({ selectedIds, setInfo, setIsLoading, setSelectedIds, setTriggers }) => async () => {
      await apiTriggerDestroy({ ids: selectedIds }, setInfo)
      const triggersResponse = await apiTriggerList(setInfo)
      setTriggers(triggersResponse)
      setIsLoading(false)
      setSelectedIds([])
    },
    handleSelectAll: ({ setSelectedIds, triggers, setIsSelectAll }) => event => {
      setSelectedIds(event.target.checked ? triggers.map(trigger => trigger.id) : [])
      setIsSelectAll(event.target.checked)
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setInfo, setTriggers } = this.props
      const triggersResponse = await apiTriggerList(setInfo)
      setTriggers(triggersResponse)
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(TriggerList)
