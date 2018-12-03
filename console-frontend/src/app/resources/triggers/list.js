import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import CircularProgress from 'shared/circular-progress'
import EditIcon from '@material-ui/icons/Edit'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableHead from '@material-ui/core/TableHead'
import MUIToolbar from '@material-ui/core/Toolbar'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import ReorderIcon from '@material-ui/icons/Reorder'
import routes from 'app/routes'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { apiTriggerDestroy, apiTriggerList, apiTriggerSort } from 'utils'
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { branch, compose, lifecycle, renderComponent, withHandlers, withState } from 'recompose'
import { BulkActions } from 'shared/list-actions'
import { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'

const CheckBoxIcon = styled(MUICheckBoxIcon)`
  color: blue;
`

const TriggerRowStyle = createGlobalStyle`
  .sortable-trigger-row {
    z-index: 1;
  }
`

const StyledReorderIcon = styled(ReorderIcon)`
  cursor: ns-resize;
`

const StyledToolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  overflow: hidden;
  white-space: nowrap;
`

const Actions = () => (
  <StyledButton color="primary" component={Link} to={routes.triggerCreate()} variant="contained">
    {'Create New'}
  </StyledButton>
)

const columns = [
  { name: 'name', numeric: true, disablePadding: false, label: 'name' },
  { name: 'flowType', numeric: false, disablePadding: false, label: 'flow type' },
  { name: 'flowId', numeric: false, disablePadding: true, label: 'flow id' },
  { name: 'urlMatchers', numeric: false, disablePadding: true, label: 'Url Matchers' },
]

const Title = styled.div`
  flex: 0 0 auto;
`

const Spacer = styled.div`
  flex: 1 1 100%;
`

const Toolbar = ({ selectedIds, deleteTriggers }) => (
  <StyledToolbar>
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
    <div>{selectedIds.length > 0 && <BulkActions deleteBulk={deleteTriggers} selectedIds={selectedIds} />}</div>
  </StyledToolbar>
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

const StyledChip = styled(Chip)`
  margin: 0.25rem;
`

const TableHead = ({ handleSelectAll, isSelectAll }) => (
  <StyledTableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <ReorderIcon />
      </TableCell>
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

const DragHandle = SortableHandle(() => <StyledReorderIcon />)

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
      <DragHandle />
    </TableCell>
    <TableCell padding="checkbox">
      <Checkbox checked={selectedIds.includes(trigger.id)} checkedIcon={<CheckBoxIcon />} onChange={handleSelect} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {trigger.name}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {trigger.flowType}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {trigger.flowId}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {trigger.urlMatchers.map((url, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledChip key={`url${index}`} label={url} />
      ))}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      <Button color="primary" component={Link} to={routes.triggerEdit(trigger.id)}>
        <EditIcon />
      </Button>
    </TableCell>
  </TableRow>
))

const SortableTriggerRow = SortableElement(({ trigger, index, handleSelectAll, selectedIds, setSelectedIds }) => (
  <TriggerRow
    handleSelectAll={handleSelectAll}
    index={index}
    selectedIds={selectedIds}
    setSelectedIds={setSelectedIds}
    trigger={trigger}
  />
))

const SortableTriggerRows = SortableContainer(({ triggers, handleSelectAll, selectedIds, setSelectedIds }) => (
  <TableBody>
    {triggers.map((trigger, index) => (
      <SortableTriggerRow
        handleSelectAll={handleSelectAll}
        index={index}
        key={trigger.id}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        trigger={trigger}
      />
    ))}
  </TableBody>
))

const TriggerList = ({
  selectedIds,
  handleSelectAll,
  triggers,
  handleRequestSort,
  deleteTriggers,
  onSortEnd,
  setSelectedIds,
  isSelectAll,
}) => (
  <PaperContainer>
    <Toolbar deleteTriggers={deleteTriggers} selectedIds={selectedIds} />
    <Table aria-labelledby="Triggers">
      <TriggerRowStyle />
      <TableHead
        handleRequestSort={handleRequestSort}
        handleSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        selectedIds={selectedIds}
        triggers={triggers}
      />
      <SortableTriggerRows
        distance={1}
        handleSelectAll={handleSelectAll}
        helperClass="sortable-trigger-row"
        onSortEnd={onSortEnd}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        triggers={triggers}
        useDragHandle
      />
    </Table>
  </PaperContainer>
)

export default compose(
  withAppBarContent({ Actions: <Actions />, breadcrumbs: [{ text: 'Triggers' }] }),
  withState('triggers', 'setTriggers', []),
  withState('isLoading', 'setIsLoading', true),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withHandlers({
    deleteTriggers: ({ setIsSelectAll, selectedIds, setIsLoading, setSelectedIds, setTriggers }) => async () => {
      await apiTriggerDestroy({ ids: selectedIds })
      const triggersResponse = await apiTriggerList()
      setTriggers(triggersResponse)
      setIsLoading(false)
      setSelectedIds([])
      setIsSelectAll(false)
    },
    handleSelectAll: ({ setSelectedIds, triggers, setIsSelectAll }) => event => {
      setSelectedIds(event.target.checked ? triggers.map(trigger => trigger.id) : [])
      setIsSelectAll(event.target.checked)
    },
    onSortEnd: ({ setTriggers, triggers }) => async ({ oldIndex, newIndex }) => {
      const orderedTriggers = arrayMove(triggers, oldIndex, newIndex)
      const orderedIds = orderedTriggers.map(trigger => trigger.id)
      setTriggers(orderedTriggers)
      await apiTriggerSort({ ids: orderedIds })
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setTriggers } = this.props
      const triggersResponse = await apiTriggerList()
      setTriggers(triggersResponse)
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(TriggerList)
