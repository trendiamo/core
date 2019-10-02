import Logo from './logo'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`

const StyledTable = styled(props => <Table {...omit(props, ['sticky'])} />)`
  height: ${({ sticky }) => (sticky ? 'calc(100% - 56px)' : '100%')};
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const StyledTableHead = styled(TableHead)`
  display: table;
`

const StyledTableBody = styled(TableBody)`
  overflow-y: auto;
`

const StyledTableCell = styled(TableCell)`
  padding: 2px;
  @media (min-width: 960px) {
    padding: 4px 12px;
  }
  border-color: ${showUpToUsBranding() ? '#e7ecef' : '#ddd'};
`

const StyledTableRow = styled(TableRow)`
  width: 100%;
  display: table;
`

const TableRowHead = styled(StyledTableRow)`
  height: 28px;
`

const TableRowBody = styled(StyledTableRow)`
  height: 40px;
`

const StyledTablePagination = styled(TablePagination)`
  background: white;
  border-top: 2px solid ${showUpToUsBranding() ? '#e7ecef' : '#ddd'};
  font-size: 14px;

  /* this needs to be max-width, as it's overriding from mui */
  @media (max-width: 600px) {
    > div {
      flex-direction: column;
      height: auto;
      padding-left: 2px;
    }
    > div > * {
      padding: 3px 0;
      margin: 0;
    }
  }
`

const iconButtonsProps = {
  back: { 'aria-label': 'previous page' },
  next: { 'aria-label': 'next page' },
}

const SimpleList = ({ columns, records, sticky, ...props }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const onPageChange = useCallback((_, page) => setPage(page), [])

  const onRowsPerPageChange = useCallback(event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }, [])

  return (
    <>
      <Wrapper>
        <StyledTable sticky={sticky} {...props}>
          <StyledTableHead>
            <TableRowHead>
              {columns.map(column => (
                <StyledTableCell key={column.id} {...column}>
                  <Typography variant="subtitle1">{column.label.toUpperCase()}</Typography>
                </StyledTableCell>
              ))}
            </TableRowHead>
          </StyledTableHead>
          <StyledTableBody>
            {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
              <TableRowBody hover key={record.id || index} role="checkbox" tabIndex="-1">
                {columns.map(column => {
                  const value = record[column.id]
                  return value ? (
                    <StyledTableCell key={column.id} {...column}>
                      {column.type === 'image' ? <Logo src={value} /> : <Typography variant="h6">{value}</Typography>}
                    </StyledTableCell>
                  ) : null
                })}
              </TableRowBody>
            ))}
          </StyledTableBody>
        </StyledTable>
        {records.length > 10 && (
          <StyledTablePagination
            backIconButtonProps={iconButtonsProps.back}
            component="div"
            count={records.length}
            nextIconButtonProps={iconButtonsProps.next}
            onChangePage={onPageChange}
            onChangeRowsPerPage={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
          />
        )}
      </Wrapper>
    </>
  )
}

export default SimpleList
