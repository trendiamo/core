import React from 'react'
import styled from 'styled-components'
import { BulkActions } from 'shared/list-actions'
import { Toolbar as MuiToolbar, Typography } from '@material-ui/core'

const SimpleToolbar = styled(MuiToolbar)`
  display: flex;
  justify-content: space-between;
`

const Title = styled.div`
  flex: 0 0 auto;
`

const Spacer = styled.div`
  flex: 1 1 100%;
`

const TableToolbar = ({ selectedIds, deleteRecords, label, defaultActions }) => (
  <SimpleToolbar>
    <Title>
      {selectedIds.length > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {`${selectedIds.length} selected`}
        </Typography>
      ) : (
        <Typography variant="subtitle1">{label}</Typography>
      )}
    </Title>
    <Spacer />
    <div>
      {selectedIds.length > 0 ? <BulkActions deleteBulk={deleteRecords} selectedIds={selectedIds} /> : defaultActions}
    </div>
  </SimpleToolbar>
)

export default TableToolbar
