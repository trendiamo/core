import Logo from './logo'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`

const StyledTable = styled(props => <Table {...omit(props, ['sticky'])} />)`
  height: ${({ sticky }) => (sticky ? 'calc(100% - 56px)' : '100%')};
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Lato', 'Helvetica', 'Arial', sans-serif;
`

const StyledTableHead = styled(TableHead)`
  display: table;
  font-family: 'Nunito Sans', 'Helvetica', 'Arial', sans-serif;
`

const StyledTableBody = styled(TableBody)`
  overflow-y: scroll;
`

const StyledTableCell = styled(TableCell)`
  font-size: 0.8125rem;
  max-width: ${({ width }) => width || '100%'};
  padding: 4px 12px;
  text-align: ${({ align }) => align || 'left'};

  ${({ font }) =>
    font === 'bold' &&
    `
    font-size: 0.85rem;
    font-weight: bold;
  `}

  ${StyledTableHead} &&& {
    background: white;
    border-bottom: 2px solid #e0e0e0;
    font-weight: bold;
  }
`

const StyledTableRow = styled(TableRow)`
  display: table;
  width: 100%;

  &:last-child ${StyledTableCell} {
    border-bottom: none;
  }
`

const StyledTablePagination = styled(TablePagination)`
  background: white;
  border-top: 2px solid #e0e0e0;
  font-size: 12px;
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
            <StyledTableRow>
              {columns.map(column => (
                <StyledTableCell key={column.id} {...column}>
                  {column.label.toUpperCase()}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </StyledTableHead>
          <StyledTableBody>
            {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
              <StyledTableRow hover key={record.id || index} role="checkbox" tabIndex="-1">
                {columns.map(column => {
                  const value = record[column.id]
                  return value ? (
                    <StyledTableCell key={column.id} {...column}>
                      {column.type === 'image' ? <Logo src={value} /> : value}
                    </StyledTableCell>
                  ) : null
                })}
              </StyledTableRow>
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
