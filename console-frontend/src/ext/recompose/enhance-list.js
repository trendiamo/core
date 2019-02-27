import AppBarButton from 'shared/app-bar-button'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CircularProgress from 'app/layout/loading'
import React from 'react'
import Section from 'shared/section'
import withAppBarContent from './with-app-bar-content'
import { apiRequest } from 'utils'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Checkbox, Table, TableBody, TablePagination } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { parse, stringify } from 'query-string'
import { TableCell, TableHead, TableRow, TableToolbar } from 'shared/table-elements'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'
import { withSnackbar } from 'notistack'

const Actions = ({ createRoute }) => (
  <AppBarButton color="primary" component={Link} to={createRoute} variant="contained">
    {'Create New'}
  </AppBarButton>
)

const extractCountFromHeaders = headers =>
  parseInt(
    headers
      .get('content-range')
      .split('/')
      .pop(),
    10
  )

const enhanceList = ({
  api,
  columns,
  defaultSorting = {},
  title,
  routes,
  blankState,
  help,
  highlightInactive,
}) => ResourceRow =>
  compose(
    withOnboardingHelp(help),
    withRouter,
    withProps(({ location }) => ({ page: parse(location.search).page - 1 || 0 })),
    withState('rowsPerPage', 'setRowsPerPage', 25),
    withAppBarContent(({ page }) => ({
      Actions: <Actions createRoute={routes.create()} />,
      title: page === 0 ? title : `${title} p.${page + 1}`,
    })),
    withState('records', 'setRecords', []),
    withState('recordsCount', 'setRecordsCount', 0),
    withState('orderDirection', 'setOrderDirection', defaultSorting.direction || 'desc'),
    withState('orderBy', 'setOrderBy', defaultSorting.column || 'id'),
    withState('selectedIds', 'setSelectedIds', []),
    withState('isSelectAll', 'setIsSelectAll', false),
    withState('isLoading', 'setIsLoading', true),
    withProps(({ rowsPerPage, page, orderDirection, orderBy }) => ({
      query: {
        range: JSON.stringify([page * rowsPerPage, (page + 1) * rowsPerPage - 1]),
        sort: JSON.stringify([orderBy, orderDirection]),
      },
    })),
    withProps(({ records }) => {
      const inactiveRows = records.map(record => record[highlightInactive] && isEmpty(record[highlightInactive]))
      return { inactiveRows }
    }),
    withSnackbar,
    withHandlers({
      fetchRecords: ({
        setIsLoading,
        setIsSelectAll,
        setRecords,
        setRecordsCount,
        setSelectedIds,
        query,
        enqueueSnackbar,
      }) => async () => {
        setIsLoading(true)
        const { json, response, errors, requestError, ...rest } = await apiRequest(api.fetch, [query])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        setSelectedIds([])
        setIsSelectAll(false)
        setIsLoading(false)
        if (requestError || errors) {
          setRecords([])
          setRecordsCount(0)
        } else {
          setRecords(json)
          setRecordsCount(extractCountFromHeaders(response.headers))
        }
        return { json, response, errors, requestError, ...rest }
      },
    }),
    lifecycle({
      componentDidMount() {
        const { fetchRecords } = this.props
        return fetchRecords()
      },
      componentDidUpdate(prevProps) {
        const { query: prevQuery } = prevProps
        const { query } = this.props
        const shouldFetch = prevQuery.range !== query.range || prevQuery.sort !== query.sort
        if (!shouldFetch) return
        const { fetchRecords } = this.props
        return fetchRecords()
      },
    }),
    branch(({ isLoading }) => isLoading, renderComponent(CircularProgress)),
    branch(({ recordsCount }) => recordsCount === 0, renderComponent(blankState)),
    withHandlers({
      deleteRecords: ({ enqueueSnackbar, selectedIds, fetchRecords, setSelectedIds, setIsSelectAll }) => async () => {
        const { requestError } = await apiRequest(api.destroy, [{ ids: selectedIds }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        await fetchRecords()
        setSelectedIds([])
        setIsSelectAll(false)
      },
      handleSelectAll: ({ setSelectedIds, records, setIsSelectAll }) => event => {
        setSelectedIds(event.target.checked ? records.map(resource => resource.id) : [])
        setIsSelectAll(event.target.checked)
      },
      handleRequestSort: ({ setOrderBy, setOrderDirection, orderDirection, orderBy }) => columnName => {
        const newDirection = orderBy === columnName ? (orderDirection === 'desc' ? 'asc' : 'desc') : 'asc'
        setOrderBy(columnName)
        setOrderDirection(newDirection)
      },
      handleChangeRowsPerPage: ({ setRowsPerPage }) => event => setRowsPerPage(event.target.value),
      handleChangePage: ({ location, history }) => (event, page) => {
        let currentSearch = parse(location.search)
        delete currentSearch.page
        const newSearch = page === 0 ? currentSearch : { ...currentSearch, page: page + 1 }
        const uri =
          Object.keys(newSearch).length === 0 ? location.pathname : `${location.pathname}?${stringify(newSearch)}`
        history.push(uri)
      },
      setSelectedIds: ({ records, setIsSelectAll, setSelectedIds }) => selectedIds => {
        setIsSelectAll(selectedIds.length === records.length)
        setSelectedIds(selectedIds)
      },
    })
  )(
    ({
      deleteRecords,
      handleChangePage,
      handleRequestSort,
      handleSelectAll,
      isSelectAll,
      title,
      orderBy,
      orderDirection,
      handleChangeRowsPerPage,
      page,
      records,
      recordsCount,
      rowsPerPage,
      selectedIds,
      setSelectedIds,
      inactiveRows,
    }) => (
      <Section>
        <TableToolbar
          createRoute={routes.create()}
          deleteRecords={deleteRecords}
          label={title}
          selectedIds={selectedIds}
        />
        <Table aria-labelledby={title}>
          <TableHead
            columns={columns}
            duplicate={!!api.duplicate}
            handleRequestSort={handleRequestSort}
            leftColumns={
              <TableCell>
                <Checkbox
                  checked={isSelectAll}
                  checkedIcon={<CheckBoxIcon />}
                  color="primary"
                  onClick={handleSelectAll}
                />
              </TableCell>
            }
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableBody>
            {records &&
              records.map((record, index) => (
                <TableRow
                  api={api}
                  handleSelectAll={handleSelectAll}
                  highlightInactive={inactiveRows[index]}
                  index={index}
                  key={record.id}
                  resource={record}
                  resourceEditPath={routes.edit(record.id)}
                  routes={routes}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                >
                  <ResourceRow record={record} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          component="div"
          count={recordsCount}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Section>
    )
  )

export default enhanceList
