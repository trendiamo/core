import Logo from './logo'
import omit from 'lodash.omit'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'

const StyledTable = styled(props => <Table {...omit(props, ['stickyHeader', 'withPagination'])} />)`
  ${({ stickyHeader }) =>
    stickyHeader &&
    `
    display: block;

    ${StyledTableHead} {
      display: table;
    }
    ${StyledTableBody} {
      display: block;
      height: calc(100% - 28px);
      overflow: hidden auto;
    }
    ${StyledTableRow} {
      @media (min-width: 1280px) {
        display: table;
      }
    }
  `}
  ${({ withPagination }) => withPagination && 'height: calc(100% - 36px);'}
`

const StyledTableHead = styled(TableHead)`
  border-bottom: 2px solid ${showUpToUsBranding() ? '#e7ecef' : '#ddd'};
  width: 100%;
`

const StyledTableBody = styled(TableBody)`
  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${showUpToUsBranding() ? '#ffb401' : '#ff6641'};
  }
`

const StyledTableCell = styled(props => <TableCell {...omit(props, 'font')} />)`
  border-color: ${showUpToUsBranding() ? '#e7ecef' : '#ddd'};
  padding: 2px;

  @media (min-width: 960px) {
    padding: 4px 12px;
  }
`

const StyledTableRow = styled(TableRow)`
  width: 100%;

  ${StyledTableCell}:last-child {
    padding-right: 12px;
  }
  &:last-child ${StyledTableCell} {
    border-bottom: none;
  }
`

const TableRowHead = styled(StyledTableRow)`
  height: 28px;
`

const TableRowBody = styled(StyledTableRow)`
  height: 44px;
`

const StyledTablePagination = styled(TablePagination)`
  background: white;
  border-top: 2px solid ${showUpToUsBranding() ? '#e7ecef' : '#ddd'};
  color: #8799a4;
  height: 36px;

  > div {
    height: 100%;
    min-height: 0;
  }
  &,
  span {
    font-size: 13px;
  }
  button {
    width: 0.5rem;
    height: 0.5rem;
  }
  svg {
    font-size: 14px;
    position: absolute;
  }
`

const SimpleList = ({ columns, records, stickyHeader, withPagination, ...props }) => {
  const [page, setPage] = useState(0)

  const filteredRecords = useMemo(() => (withPagination ? records.slice(page * 10, page * 10 + 10) : records), [
    page,
    records,
    withPagination,
  ])

  const onPageChange = useCallback((_, page) => setPage(page), [])

  return (
    <>
      <StyledTable stickyHeader={stickyHeader} withPagination={withPagination} {...props}>
        <StyledTableHead>
          <TableRowHead>
            {columns.map(column => (
              <StyledTableCell key={column.id} {...omit(column, ['label', 'variant'])}>
                <Typography variant="subtitle1">{column.label}</Typography>
              </StyledTableCell>
            ))}
          </TableRowHead>
        </StyledTableHead>
        <StyledTableBody>
          {filteredRecords.map((record, index) => (
            <TableRowBody hover key={record.id || index} role="checkbox" tabIndex="-1">
              {columns.map(column => {
                const value = record[column.id]
                return (
                  <StyledTableCell headers={[column.id]} key={column.id} {...omit(column, ['id', 'label', 'variant'])}>
                    {value ? (
                      column.variant === 'image' ? (
                        <Logo src={value} />
                      ) : (
                        <Typography variant={column.variant || 'body2'}>{value}</Typography>
                      )
                    ) : null}
                  </StyledTableCell>
                )
              })}
            </TableRowBody>
          ))}
        </StyledTableBody>
      </StyledTable>
      {withPagination && (
        <StyledTablePagination
          component="div"
          count={records.length}
          labelRowsPerPage={null}
          onChangePage={onPageChange}
          page={page}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        />
      )}
    </>
  )
}

export default SimpleList
