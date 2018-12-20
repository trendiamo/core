import AppBarButton from 'shared/app-bar-button'
import BlankStateTemplate from 'shared/blank-state'
import CircularProgress from 'shared/circular-progress'
import EditIcon from '@material-ui/icons/EditOutlined'
import MuiCheckBoxIcon from '@material-ui/icons/CheckBox'
import React from 'react'
import ReorderIcon from '@material-ui/icons/Reorder'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { apiTriggerDestroy, apiTriggerList, apiTriggerSort } from 'utils'
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { branch, compose, lifecycle, renderComponent, withHandlers, withState } from 'recompose'
import { Button, Checkbox, Chip, Table, TableBody, TableRow, Typography } from '@material-ui/core'
import { camelize } from 'inflected'
import { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import { TableCell, TableHead, TableToolbar } from 'shared/table-elements'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withSnackbar } from 'notistack'

const BlankState = () => (
  <BlankStateTemplate
    description={"You don't have any triggers yet. Let's create the first one?"}
    imageSource="/img/background/img-welcome.png"
    route={routes.triggerCreate()}
    title="Create a new trigger"
  />
)

const CheckBoxIcon = styled(MuiCheckBoxIcon)`
  color: blue;
`

const InlineTypography = styled(Typography)`
  display: inline-block;
`

const TriggerRowStyle = createGlobalStyle`
  .sortable-trigger-row {
    pointer-events: auto !important;
    z-index: 1;
    background: #fff !important;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.24);
  }
`

const StyledReorderIcon = styled(ReorderIcon)`
  cursor: ns-resize;
`

const Actions = () => (
  <AppBarButton color="primary" component={Link} to={routes.triggerCreate()} variant="contained">
    {'Create New'}
  </AppBarButton>
)

const columns = [
  { name: 'flow', padding: 'none', label: 'flow' },
  { name: 'urlMatchers', padding: 'none', label: 'Url Matchers' },
]

const StyledChip = styled(Chip)`
  margin: 0.25rem;
  margin-left: 0;
`

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
    <TableCell>
      <DragHandle />
    </TableCell>
    <TableCell>
      <Checkbox checked={selectedIds.includes(trigger.id)} checkedIcon={<CheckBoxIcon />} onChange={handleSelect} />
    </TableCell>
    <TableCell width="50%">
      <InlineTypography variant="subtitle2">{`${trigger.flowType} #${trigger.flowId}: '${
        trigger.flow.name
      }'`}</InlineTypography>
      <Button
        component={Link}
        size="small"
        style={{ marginLeft: '0.5rem' }}
        to={routes[`${camelize(trigger.flowType, false)}Edit`](trigger.flowId)}
        variant="outlined"
      >
        {'Edit flow'}
      </Button>
    </TableCell>
    <TableCell width="50%">
      {trigger.urlMatchers.map((url, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledChip key={`url${index}`} label={url} />
      ))}
    </TableCell>
    <TableCell>
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
  <Section>
    <TableToolbar deleteRecords={deleteTriggers} label="Triggers" selectedIds={selectedIds} />
    <Table aria-labelledby="Triggers">
      <TriggerRowStyle />
      <TableHead
        columns={columns}
        handleRequestSort={handleRequestSort}
        handleSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        leftColumns={
          <React.Fragment>
            <TableCell>{'Sort'}</TableCell>
            <TableCell>
              <Checkbox checked={isSelectAll} checkedIcon={<CheckBoxIcon />} onClick={handleSelectAll} />
            </TableCell>
          </React.Fragment>
        }
        selectedIds={selectedIds}
        triggers={triggers}
      />
      <SortableTriggerRows
        distance={1}
        handleSelectAll={handleSelectAll}
        helperClass="sortable-trigger-row"
        lockAxis="y"
        onSortEnd={onSortEnd}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        triggers={triggers}
        useDragHandle
        useWindowAsScrollContainer
      />
    </Table>
  </Section>
)

export default compose(
  withOnboardingHelp({ single: true, stepName: 'triggers', stageName: 'initial' }),
  withAppBarContent({ Actions: <Actions />, breadcrumbs: [{ text: 'Triggers' }] }),
  withState('triggers', 'setTriggers', []),
  withState('isLoading', 'setIsLoading', true),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withSnackbar,
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
    onSortEnd: ({ enqueueSnackbar, setTriggers, triggers }) => async ({ oldIndex, newIndex }) => {
      const orderedTriggers = arrayMove(triggers, oldIndex, newIndex)
      const orderedIds = orderedTriggers.map(trigger => trigger.id)
      setTriggers(orderedTriggers)
      await apiTriggerSort({ ids: orderedIds })
      enqueueSnackbar('Sorted!', { variant: 'success' })
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
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress)),
  branch(({ triggers }) => triggers.length === 0, renderComponent(BlankState))
)(TriggerList)
