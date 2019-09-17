import EditButton from 'shared/edit-button'
import omit from 'lodash.omit'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import { Button, Checkbox, Chip, InputAdornment, Table, TableRow, Typography } from '@material-ui/core'
import { camelize } from 'inflected'
import { CheckBox as CheckBoxIcon, Close, EditOutlined as EditIcon } from '@material-ui/icons'
import { createGlobalStyle } from 'styled-components'
import { DragHandle, SortableContainer, SortableElement } from 'shared/sortable-elements'
import { Field, IconButton } from 'shared/form-elements'
import { Link } from 'react-router-dom'
import { TableCell, TableHead, TableToolbar } from 'shared/table-elements'

const InlineTypography = styled(props => <Typography {...omit(props, ['highlight'])} />)`
  display: inline-block;
  color: ${({ highlight }) => (highlight ? '#fff' : '')};
`

const TriggerRowStyle = createGlobalStyle`
  .sortable-trigger-row {
    pointer-events: auto !important;
    background: #fff !important;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.24);
  }
`

const columns = [
  { name: 'id', label: 'id' },
  { name: 'module', padding: 'none', label: 'module' },
  { name: 'urlMatchers', padding: 'none', label: 'URL Matchers' },
]

const StyledChip = styled(props => <Chip {...omit(props, ['highlight', 'enabled'])} />)`
  margin: 0.25rem;
  margin-left: 0;
  background: ${({ highlight, enabled }) => (highlight ? '#fff' : enabled ? 'rgba(255,255,255,0.2)' : '')};
  color: ${({ highlight }) => (highlight ? '#257c46' : '')};
  transition: all 0.2s;
`

const TableRowStyled = styled(props => <TableRow {...omit(props, ['highlight'])} />)`
  background: ${({ highlight }) => (highlight ? '#257c46 !important' : '#fff')};
  transition: all 0.2s;
`

const TriggerRow = ({ trigger, selectedIds, setSelectedIds, highlightEnabled, highlightUrl, hostnames }) => {
  const handleSelect = useCallback(
    event => {
      if (event.target.checked) {
        setSelectedIds([...selectedIds, trigger.id])
      } else {
        const newIdsToDelete = [...selectedIds]
        newIdsToDelete.splice(selectedIds.indexOf(trigger.id), 1)
        setSelectedIds(newIdsToDelete)
      }
    },
    [selectedIds, setSelectedIds, trigger.id]
  )

  return (
    <TableRowStyled highlight={highlightEnabled} hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <DragHandle highlight={highlightEnabled} />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={selectedIds.includes(trigger.id)}
          color="primary"
          onChange={handleSelect}
          style={{ color: highlightEnabled ? '#fff' : '' }}
        />
      </TableCell>
      <TableCell>{trigger.id}</TableCell>
      <TableCell style={{ whiteSpace: 'nowrap' }} width="50%">
        <InlineTypography highlight={highlightEnabled} variant="subtitle2">{`${trigger.flowType}: '${
          trigger.flow.name
        }'`}</InlineTypography>
        <Button
          component={Link}
          size="small"
          style={{
            marginLeft: '0.5rem',
            color: highlightEnabled ? '#fff' : '',
            borderColor: highlightEnabled && 'rgba(255,255,255,0.3)',
          }}
          to={routes[`${camelize(trigger.flowType, false)}Edit`](trigger.flowId)}
          variant="outlined"
        >
          {'Edit module'}
        </Button>
      </TableCell>
      <TableCell width="50%">
        {trigger.urlMatchers.map((url, index) => (
          <StyledChip
            clickable
            component="a"
            enabled={highlightEnabled}
            highlight={highlightUrl === index}
            href={`http://${hostnames[0] + url}`}
            // eslint-disable-next-line react/no-array-index-key
            key={`url${index}`}
            label={url}
            target="_blank"
          />
        ))}
      </TableCell>
      <TableCell>
        <EditButton
          component={Link}
          style={{ color: highlightEnabled ? '#fff' : '' }}
          to={routes.triggerEdit(trigger.id)}
        >
          <EditIcon />
        </EditButton>
      </TableCell>
    </TableRowStyled>
  )
}

const SortableTriggerRow = SortableElement(TriggerRow)
const SortableTriggerRows = ({
  handleSelectAll,
  hostnames,
  onSortEnd,
  selectedIds,
  setSelectedIds,
  testerUrl,
  triggers,
}) => (
  <SortableContainer
    distance={1}
    helperClass="sortable-element sortable-trigger-row"
    lockToContainerEdges
    onSortEnd={onSortEnd}
    wrapper="tbody"
  >
    {triggers &&
      triggers.map((trigger, index) => (
        <SortableTriggerRow
          handleSelectAll={handleSelectAll}
          highlightEnabled={testerUrl.matches && testerUrl.matches.index === index}
          highlightUrl={testerUrl.matches && testerUrl.matches.index === index && testerUrl.matches.urlIndex}
          hostnames={hostnames}
          index={index}
          key={trigger.id}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          trigger={trigger}
        />
      ))}
  </SortableContainer>
)

const UrlTester = ({ testerUrl, setTesterUrl }) => {
  const changeValue = useCallback(
    event => {
      const url = event.target.value
      setTesterUrl({ value: url, matches: false })
    },
    [setTesterUrl]
  )

  const resetUrl = useCallback(
    () => {
      setTesterUrl({ value: '', matches: false })
    },
    [setTesterUrl]
  )

  return (
    <Field
      endAdornment={
        <InputAdornment position="end">
          {testerUrl.value && (
            <IconButton aria-label="Clear url tester" onClick={resetUrl} style={{ padding: '4px' }}>
              <Close fontSize="small" />
            </IconButton>
          )}
        </InputAdornment>
      }
      label="Test your URL here"
      name="url"
      onChange={changeValue}
      style={{ minWidth: '250px' }}
      value={testerUrl.value}
    />
  )
}

const TriggersListBase = ({
  deleteTriggers,
  handleSelectAll,
  hostnames,
  isSelectAll,
  onSortEnd,
  selectedIds,
  setSelectedIds,
  setTesterUrl,
  testerUrl,
  triggers,
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
        handleSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        leftColumns={
          <>
            <TableCell>{'Sort'}</TableCell>
            <TableCell>
              <Checkbox
                checked={isSelectAll}
                checkedIcon={<CheckBoxIcon />}
                color="primary"
                onClick={handleSelectAll}
              />
            </TableCell>
          </>
        }
        selectedIds={selectedIds}
        triggers={triggers}
      />
      <SortableTriggerRows
        handleSelectAll={handleSelectAll}
        hostnames={hostnames}
        onSortEnd={onSortEnd}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        testerUrl={testerUrl}
        triggers={triggers}
      />
    </Table>
  </Section>
)

export default TriggersListBase
