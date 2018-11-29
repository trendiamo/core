import CircularProgress from 'shared/circular-progress'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { TableHead, TableRow, TableToolbar } from 'shared/table-elements'

const enhanceList = ({ api, columns, label, routes }) => ResourceRow =>
  compose(
    withState('records', 'setRecords', []),
    withState('recordsCount', 'setRecordsCount', 0),
    withState('range', 'setRange', []),
    withState('orderDirection', 'setOrderDirection', 'desc'),
    withState('orderBy', 'setOrderBy', 'id'),
    withState('selectedIds', 'setSelectedIds', []),
    withState('isSelectAll', 'setIsSelectAll', false),
    withState('page', 'setPage', 0),
    withState('rowsPerPage', 'setRowsPerPage', 10),
    withState('isLoading', 'setIsLoading', true),
    withProps(({ rowsPerPage, page, orderDirection, orderBy }) => ({
      query: {
        range: JSON.stringify([page * rowsPerPage, (page + 1) * rowsPerPage - 1]),
        sort: JSON.stringify([orderBy, orderDirection]),
      },
    })),
    withHandlers({
      fetchRecords: ({ setIsLoading, setRecords, setRecordsCount, query }) => async () => {
        setIsLoading(true)
        const resourceResponse = await api.fetch(query)
        setRecords(resourceResponse.json)
        setRecordsCount(resourceResponse.count)
        setIsLoading(false)
        return resourceResponse
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
    withHandlers({
      deleteRecords: ({ selectedIds, fetchRecords, setSelectedIds, setIsSelectAll }) => async () => {
        await api.destroy({ ids: selectedIds })
        await fetchRecords()
        setSelectedIds([])
        setIsSelectAll(false)
      },
      handleSelectAll: ({ setSelectedIds, records, setIsSelectAll }) => event => {
        setSelectedIds(event.target.checked ? records.map(resource => resource.id) : [])
        setIsSelectAll(event.target.checked)
      },
      handleRequestSort: ({ setOrderBy, setOrderDirection, orderDirection, orderBy }) => async columnName => {
        const newDirection = orderBy === columnName ? (orderDirection === 'desc' ? 'asc' : 'desc') : 'asc'
        setOrderBy(columnName)
        setOrderDirection(newDirection)
      },
      handleChangeRowsPerPage: ({ setRowsPerPage }) => async event => {
        setRowsPerPage(event.target.value)
      },
      handleChangePage: ({ setPage }) => async (event, page) => {
        setPage(page)
      },
    })
  )(
    ({
      deleteRecords,
      handleChangePage,
      handleRequestSort,
      handleSelectAll,
      isSelectAll,
      orderBy,
      orderDirection,
      handleChangeRowsPerPage,
      page,
      records,
      recordsCount,
      rowsPerPage,
      selectedIds,
      setSelectedIds,
    }) => (
      <PaperContainer>
        <TableToolbar
          createRoute={routes.create()}
          deleteRecords={deleteRecords}
          label={label}
          selectedIds={selectedIds}
        />
        <Table aria-labelledby={label}>
          <TableHead
            columns={columns}
            handleRequestSort={handleRequestSort}
            handleSelectAll={handleSelectAll}
            isSelectAll={isSelectAll}
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                handleSelectAll={handleSelectAll}
                index={index}
                key={record.id}
                resource={record}
                resourceEditPath={routes.edit(record.id)}
                resourceShowPath={routes.show(record.id)}
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
          rowsPerPageOptions={[5, 10, 25]}
        />
      </PaperContainer>
    )
  )

export default enhanceList
