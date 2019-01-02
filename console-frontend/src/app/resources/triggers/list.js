import AppBarButton from 'shared/app-bar-button'
import BlankStateTemplate from 'shared/blank-state'
import CircularProgress from 'shared/circular-progress'
import omit from 'lodash.omit'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { apiTriggerDestroy, apiTriggerList, apiTriggerSort } from 'utils'
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { branch, compose, lifecycle, renderComponent, withHandlers, withState } from 'recompose'
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Table,
  TableBody,
  TableRow,
  Typography,
} from '@material-ui/core'
import { camelize } from 'inflected'
import {
  Close,
  EditOutlined as EditIcon,
  CheckBox as MuiCheckBoxIcon,
  Reorder as ReorderIcon,
} from '@material-ui/icons'
import { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import { matchUrl } from 'plugin-base'
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

const InlineTypography = styled(({ ...props }) => <Typography {...omit(props, ['highlight'])} />)`
  display: inline-block;
  color: ${({ highlight }) => (highlight ? '#fff' : '')};
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

const StyledChip = styled(({ ...props }) => <Chip {...omit(props, ['highlight', 'enabled'])} />)`
  margin: 0.25rem;
  margin-left: 0;
  background: ${({ highlight, enabled }) => (highlight ? '#fff' : enabled ? 'rgba(255,255,255,0.2)' : '')};
  color: ${({ highlight }) => (highlight ? '#51b165' : '')};
  transition: all 0.2s;
`

const DragHandle = SortableHandle(styled(props => <StyledReorderIcon {...omit(props, ['highlight'])} />)`
  color: ${({ highlight }) => (highlight ? '#fff' : '')};
`)

const triggerMatches = (trigger, referenceUrl) => {
  let enabled = false
  const array = trigger.urlMatchers.map(url => {
    const urlMatches = matchUrl(referenceUrl, url)
    enabled = enabled || urlMatches
    return urlMatches
  })
  return { enabled, array }
}

const TableRowStyled = styled(props => <TableRow {...omit(props, ['highlight'])} />)`
  background: ${({ highlight }) => (highlight ? '#51b165 !important' : '#fff')};
  transition: all 0.2s;
`

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
)(({ trigger, handleSelect, selectedIds, highlight }) => (
  <TableRowStyled highlight={highlight.enabled} hover role="checkbox" tabIndex={-1}>
    <TableCell>
      <DragHandle highlight={highlight.enabled} />
    </TableCell>
    <TableCell>
      <Checkbox
        checked={selectedIds.includes(trigger.id)}
        onChange={handleSelect}
        style={{ color: highlight.enabled ? '#fff' : '' }}
      />
    </TableCell>
    <TableCell width="50%">
      <InlineTypography highlight={highlight.enabled} variant="subtitle2">{`${trigger.flowType} #${trigger.flowId}: '${
        trigger.flow.name
      }'`}</InlineTypography>
      <Button
        component={Link}
        size="small"
        style={{
          marginLeft: '0.5rem',
          color: highlight.enabled ? '#fff' : '',
          borderColor: highlight.enabled && 'rgba(255,255,255,0.3)',
        }}
        to={routes[`${camelize(trigger.flowType, false)}Edit`](trigger.flowId)}
        variant="outlined"
      >
        {'Edit flow'}
      </Button>
    </TableCell>
    <TableCell width="50%">
      {trigger.urlMatchers.map((url, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledChip enabled={highlight.enabled} highlight={highlight.array[index]} key={`url${index}`} label={url} />
      ))}
    </TableCell>
    <TableCell>
      <Button component={Link} style={{ color: highlight.enabled ? '#fff' : '' }} to={routes.triggerEdit(trigger.id)}>
        <EditIcon />
      </Button>
    </TableCell>
  </TableRowStyled>
))

const SortableTriggerRow = SortableElement(
  ({ trigger, index, handleSelectAll, selectedIds, setSelectedIds, highlight }) => (
    <TriggerRow
      handleSelectAll={handleSelectAll}
      highlight={highlight}
      index={index}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      trigger={trigger}
    />
  )
)

const SortableTriggerRows = SortableContainer(
  ({ triggers, handleSelectAll, selectedIds, setSelectedIds, testerUrl }) => (
    <TableBody>
      {triggers.map((trigger, index) => (
        <SortableTriggerRow
          handleSelectAll={handleSelectAll}
          highlight={triggerMatches(trigger, testerUrl)}
          index={index}
          key={trigger.id}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          testerUrl={testerUrl}
          trigger={trigger}
        />
      ))}
    </TableBody>
  )
)

const UrlTesterTemplate = ({ changeValue, testerUrl, resetUrl }) => (
  <FormControl style={{ display: 'flex' }}>
    <InputLabel htmlFor="urlTester">{'Test your URL here'}</InputLabel>
    <Input
      endAdornment={
        <InputAdornment position="end">
          {testerUrl && (
            <IconButton aria-label="Clear url tester" onClick={resetUrl} style={{ padding: '4px' }}>
              <Close fontSize="small" />
            </IconButton>
          )}
        </InputAdornment>
      }
      id="urlTester"
      label=""
      onChange={changeValue}
      style={{ minWidth: '250px' }}
      value={testerUrl}
    />
  </FormControl>
)
const UrlTester = compose(
  withHandlers({
    changeValue: ({ setTesterUrl }) => event => {
      setTesterUrl(event.target.value)
    },
    resetUrl: ({ setTesterUrl }) => () => {
      setTesterUrl('')
    },
  })
)(UrlTesterTemplate)

const TriggerList = ({
  selectedIds,
  handleSelectAll,
  triggers,
  handleRequestSort,
  deleteTriggers,
  onSortEnd,
  setSelectedIds,
  isSelectAll,
  setTesterUrl,
  testerUrl,
}) => (
  <Section>
    <TableToolbar
      defaultActions={<UrlTester setTesterUrl={setTesterUrl} testerUrl={testerUrl} />}
      deleteRecords={deleteTriggers}
      label="Triggers"
      selectedIds={selectedIds}
    />
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
        testerUrl={testerUrl}
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
  withState('testerUrl', 'setTesterUrl', ''),
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
