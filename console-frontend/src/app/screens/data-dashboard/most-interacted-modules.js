import CircularProgress from 'shared/circular-progress'
import EditButton from 'shared/edit-button'
import ErrorMessage from './error-message'
import moduleIcon from 'shared/module-icon'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { ActiveColumn, TableCell, TableHead } from 'shared/table-elements'
import { apiEventList, apiRequest } from 'utils'
import { EditOutlined as EditIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableRow, Tooltip } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const columns = [
  { name: 'id', label: 'ID' },
  { name: 'type', label: 'Type', align: 'center' },
  { name: 'name', label: 'Name' },
  {
    name: 'bar',
    labelIsShowingSorting: true,
    sortable: true,
    sortingOptions: [
      { title: 'Conversion', name: 'conversion' },
      { title: 'Toggled Count', name: 'toggledCount' },
      { title: 'Loaded Count', name: 'loadedCount' },
    ],
  },
  { name: 'active', label: 'Active', align: 'center' },
]

const ConversionBar = styled.div`
  background: #ff6641;
  height: 100%;
  transition: width 0.8s;
`

const StatsBarContainer = styled.div`
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 100%;
`

const StatsNumber = styled.div`
  cursor: default;
  transition: opacity 0.6s;
  ${({ position }) => `
    color: ${position === 'left' ? '#fff' : '#333'};
    ${
      position === 'left'
        ? 'text-shadow: 0px 1px 2px #000000b8; position: absolute; top: 2px; left: 5px;'
        : `display: inline-block;
        width: 10%;
    padding: 2px 0px 2px 5px;`
    }
  `}
  opacity: ${({ show }) => +show};
`

const LoadedCountBar = styled.div`
  background: #eee;
  height: 20px;
  overflow: hidden;
  transition: width 0.8s, opacity 0.6s;
  display: inline-block;
  vertical-align: middle;
`

const StatsBar = ({
  record,
  widthReference,
  showToggledCount,
  showLoadedCount,
  showConversionBar,
  showLoadedCountBar,
}) => {
  const toggledRatio = useMemo(() => Math.round(record.conversion * 100), [record.conversion])

  const containerWidth = useMemo(() => Math.round((record.loadedCount / widthReference) * 90), [
    record.loadedCount,
    widthReference,
  ])

  const tooltipTitle = useMemo(
    () => `Loaded plugin: ${record.loadedCount} | Opened plugin: ${record.toggledCount} (${toggledRatio}%)`,
    [record.loadedCount, record.toggledCount, toggledRatio]
  )

  return (
    <StatsBarContainer>
      <Tooltip enterDelay={50} placement="bottom-start" title={tooltipTitle}>
        <div>
          <LoadedCountBar
            style={{ width: `${showLoadedCountBar ? containerWidth : 0}%`, opacity: showLoadedCountBar ? 1 : 0 }}
          >
            <StatsNumber position="left" show={showToggledCount}>
              {record.toggledCount}
            </StatsNumber>
            <ConversionBar style={{ width: `${showConversionBar ? toggledRatio : 0}%` }} />
          </LoadedCountBar>
          <StatsNumber position="right" show={showLoadedCount}>
            {record.loadedCount}
          </StatsNumber>
        </div>
      </Tooltip>
    </StatsBarContainer>
  )
}

const MainTable = ({ data, handleRequestSort, sorting }) => {
  const [showLoadedCount, setShowLoadedCount] = useState(false)
  const [showToggledCount, setShowToggledCount] = useState(false)
  const [showConversionBar, setShowConversionBar] = useState(false)
  const [showLoadedCountBar, setShowLoadedCountBar] = useState(false)

  const widthReference = useMemo(
    () => {
      const record = data.reduce((max, data) => (max.loadedCount > data.loadedCount ? max : data), {})
      return record.loadedCount
    },
    [data]
  )

  useEffect(() => {
    let didCancel = false
    setTimeout(() => {
      didCancel || setShowToggledCount(true)
    }, 600)
    setTimeout(() => {
      didCancel || setShowLoadedCount(true)
    }, 740)
    setTimeout(() => {
      didCancel || setShowConversionBar(true)
    }, 500)
    setTimeout(() => {
      didCancel || setShowLoadedCountBar(true)
    }, 50)
    return () => (didCancel = true)
  }, [])

  const orderBy = useMemo(() => ({ columnName: 'bar', optionName: sorting }), [sorting])

  return (
    <Table aria-labelledby="Most Interacted Modules">
      <TableHead columns={columns} handleRequestSort={handleRequestSort} orderBy={orderBy} orderDirection="desc" />
      <TableBody>
        {data.map((record, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={index}>
            <TableCell>{record.flowId}</TableCell>
            <TableCell align="center" width="5%">
              {moduleIcon(record.flowTypeTitle)}
            </TableCell>
            <TableCell width="25%">{record.name}</TableCell>
            <TableCell width="70%">
              <StatsBar
                record={record}
                showConversionBar={showConversionBar}
                showLoadedCount={showLoadedCount}
                showLoadedCountBar={showLoadedCountBar}
                showToggledCount={showToggledCount}
                widthReference={widthReference}
              />
            </TableCell>
            <ActiveColumn
              highlightInactive={record.active}
              symbolTextActive="Active"
              symbolTextInactive="Draft"
              tooltipTextActive="Already used in Triggers"
              tooltipTextInactive="Not yet used in Triggers"
            />
            <TableCell>
              <EditButton component={Link} to={routes[record.flowType + 'Edit'](record.flowId)}>
                <EditIcon />
              </EditButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const MostInteractedModules = ({ dates }) => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)
  const [sorting, setSorting] = useState('conversion')

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiEventList, [
          { dates: JSON.stringify(dates), sort: sorting, chart: 'most_interacted_modules' },
        ])
        if (requestError) {
          enqueueSnackbar(requestError, { variant: 'error' })
          setHasErrors(true)
        } else if (json.length === 0) {
          setHasErrors(true)
        } else {
          setData(json)
          setHasErrors(false)
        }
        setIsLoading(false)
      })()
    },
    [dates, sorting, enqueueSnackbar]
  )

  const handleRequestSort = useCallback(({ optionName }) => {
    setSorting(optionName)
  }, [])

  if (isLoading) return <CircularProgress />

  if (hasErrors) {
    return <ErrorMessage>{'⚠️ There was a problem loading your data, please try again or contact us.'}</ErrorMessage>
  }

  return <MainTable data={data} handleRequestSort={handleRequestSort} sorting={sorting} />
}

export default MostInteractedModules
