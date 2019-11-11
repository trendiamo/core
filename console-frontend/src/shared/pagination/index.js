import React, { useCallback } from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import { parse, stringify } from 'query-string'
import { useHistory } from 'react-router-dom'

export const extractCountFromHeaders = headers =>
  parseInt(
    headers
      .get('content-range')
      .split('/')
      .pop(),
    10
  )

const backIconButtonProps = {
  'aria-label': 'Previous Page',
}

const Pagination = ({ totalRecordsCount, page, setPage, rowsPerPage, onChangeRowsPerPage, isDispatched }) => {
  const history = useHistory()

  const handleChangePage = useCallback(
    (event, newPage) => {
      let currentSearch = parse(window.location.search)
      delete currentSearch.page
      const newSearch = newPage === 0 ? currentSearch : { ...currentSearch, page: newPage + 1 }
      const uri =
        Object.keys(newSearch).length === 0
          ? window.location.pathname
          : `${window.location.pathname}?${stringify(newSearch)}`
      history.push(uri)
      setPage(isDispatched ? 'handleChangePage' : parse(window.location.search).page - 1 || 0)
    },
    [history, isDispatched, setPage]
  )

  return (
    <TablePagination
      backIconButtonProps={backIconButtonProps}
      component="div"
      count={totalRecordsCount}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage || null}
      page={page}
      rowsPerPage={rowsPerPage || 10}
      rowsPerPageOptions={[]}
    />
  )
}

export default Pagination
