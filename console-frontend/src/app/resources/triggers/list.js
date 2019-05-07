import AppBarButton from 'shared/app-bar-button'
import BlankStateTemplate from 'shared/blank-state'
import CircularProgress from 'shared/circular-progress'
import EditButton from 'shared/edit-button'
import omit from 'lodash.omit'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiRequest, apiTriggerDestroy, apiTriggerList, apiTriggerSort } from 'utils'
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
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
import { CheckBox as CheckBoxIcon, Close, EditOutlined as EditIcon, Reorder as ReorderIcon } from '@material-ui/icons'
import { createGlobalStyle } from 'styled-components'
import { isEqual } from 'lodash'
import { Link } from 'react-router-dom'
import { matchUrl } from 'plugin-base'
import { TableCell, TableHead, TableToolbar } from 'shared/table-elements'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description={"You don't have any triggers yet. Let's create the first one?"}
    imageSource="/img/background/img-welcome.png"
    route={routes.triggerCreate()}
    title="Create a new trigger"
  />
)

const InlineTypography = styled(({ ...props }) => <Typography {...omit(props, ['highlight'])} />)`
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

const StyledReorderIcon = styled(ReorderIcon)`
  cursor: ns-resize;
`

const Actions = () => (
  <AppBarButton color="primary" component={Link} to={routes.triggerCreate()} variant="contained">
    {'Create New'}
  </AppBarButton>
)

const columns = [
  { name: 'module', padding: 'none', label: 'module' },
  { name: 'urlMatchers', padding: 'none', label: 'Url Matchers' },
]

const StyledChip = styled(({ ...props }) => <Chip {...omit(props, ['highlight', 'enabled'])} />)`
  margin: 0.25rem;
  margin-left: 0;
  background: ${({ highlight, enabled }) => (highlight ? '#fff' : enabled ? 'rgba(255,255,255,0.2)' : '')};
  color: ${({ highlight }) => (highlight ? '#257c46' : '')};
  transition: all 0.2s;
`

const DragHandle = SortableHandle(styled(props => <StyledReorderIcon {...omit(props, ['highlight'])} />)`
  color: ${({ highlight }) => (highlight ? '#fff' : '')};
`)

const iterateTriggers = (triggers, input, result) => {
  triggers.forEach((trigger, index) => {
    if (result) return false
    trigger.urlMatchers.map((url, urlIndex) => {
      const matches = matchUrl(input, url)
      if (matches) result = { index, urlIndex }
      return result
    })
  })
  return result
}

const isValidUrl = referenceUrl => {
  const regexp = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/
  return regexp.test(referenceUrl)
}

const matchTriggers = (triggers, referenceUrl, hostnames) => {
  let result = false
  let input = referenceUrl
  if (referenceUrl.charAt(0) === '/') {
    result = iterateTriggers(triggers, input, result)
    return result
  } else {
    const parsedReferenceUrl = isValidUrl(referenceUrl) ? new URL(`${referenceUrl}`) : false
    input = parsedReferenceUrl.pathname
    hostnames.forEach(hostname => {
      if (parsedReferenceUrl.hostname === hostname) {
        result = iterateTriggers(triggers, input, result)
        return result
      }
    })
  }
  return result
}

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
        let newIdsToDelete = [...selectedIds]
        newIdsToDelete.splice(selectedIds.indexOf(trigger.id), 1)
        setSelectedIds(newIdsToDelete)
      }
    },
    [selectedIds, setSelectedIds, trigger.id]
  )

  if (trigger.flowType === 'Navigation') return null

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
const SortableTriggerRows = SortableContainer(
  ({ triggers, handleSelectAll, selectedIds, setSelectedIds, testerUrl, hostnames }) => (
    <TableBody>
      {triggers &&
        triggers.map((trigger, index) =>
          trigger.flowType === 'Navigation' ? null : (
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
          )
        )}
    </TableBody>
  )
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
    <FormControl style={{ display: 'flex' }}>
      <InputLabel htmlFor="urlTester">{'Test your URL here'}</InputLabel>
      <Input
        endAdornment={
          <InputAdornment position="end">
            {testerUrl.value && (
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
        value={testerUrl.value}
      />
    </FormControl>
  )
}

const appBarContent = { Actions: <Actions />, title: 'Triggers' }

const TriggersList = ({ location }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'triggers', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)
  useAppBarContent(appBarContent)
  const { enqueueSnackbar } = useSnackbar()

  const [triggers, setTriggers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [testerUrl, setTesterUrl] = useState({ value: '', matches: false })
  const [selectedIds, setSelectedIds] = useState([])
  const [hostnames, setHostnames] = useState([])
  const [isSelectAll, setIsSelectAll] = useState(false)

  const deleteTriggers = useCallback(
    async () => {
      const { requestError } = await apiRequest(apiTriggerDestroy, [{ ids: selectedIds }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      const { json, errors, requestError: requestError2 } = await apiRequest(apiTriggerList, [])
      if (requestError2) enqueueSnackbar(requestError2, { variant: 'error' })
      setIsLoading(false)
      setSelectedIds([])
      setIsSelectAll(false)
      if (errors) return
      setTriggers(json)
    },
    [enqueueSnackbar, selectedIds]
  )

  const handleSelectAll = useCallback(
    event => {
      setSelectedIds(event.target.checked ? triggers.map(trigger => trigger.id) : [])
      setIsSelectAll(event.target.checked)
    },
    [triggers]
  )

  const onSortEnd = useCallback(
    async ({ oldIndex, newIndex }) => {
      const orderedTriggers = arrayMove(triggers, oldIndex, newIndex)
      const orderedIds = orderedTriggers.map(trigger => trigger.id)
      setTriggers(orderedTriggers)
      const { errors, requestError } = await apiRequest(apiTriggerSort, [{ ids: orderedIds }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Sorted!', { variant: 'success' })
    },
    [enqueueSnackbar, triggers]
  )

  useEffect(
    () => {
      ;(async () => {
        const { json, response, errors, requestError } = await apiRequest(apiTriggerList, [])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (requestError || errors) return
        setTriggers(json)
        setHostnames(JSON.parse(response.headers.get('hostnames')))
        setIsLoading(false)
      })()
    },
    [enqueueSnackbar]
  )

  useEffect(
    () => {
      if (testerUrl.value) {
        const matchesUrl = matchTriggers(triggers, testerUrl.value, hostnames)
        if (!isEqual(testerUrl.matches, matchesUrl)) {
          setTesterUrl({ ...testerUrl, matches: matchesUrl })
        }
      }
    },
    [hostnames, testerUrl, triggers]
  )

  if (isLoading) return <CircularProgress />
  if (triggers.length === 0) return <BlankState />

  return (
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
          distance={1}
          handleSelectAll={handleSelectAll}
          helperClass="sortable-element sortable-trigger-row"
          hostnames={hostnames}
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
}

export default withRouter(TriggersList)
