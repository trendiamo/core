import MUIToolbar from '@material-ui/core/Toolbar'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { BulkActions } from 'shared/list-actions'

const SimpleToolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`

const Title = styled.div`
  flex: 0 0 auto;
`

const Spacer = styled.div`
  flex: 1 1 100%;
`

const TableToolbar = ({ selectedIds, deleteRecords, label }) => (
  <SimpleToolbar>
    <Title>
      {selectedIds.length > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {`${selectedIds.length} selected`}
        </Typography>
      ) : (
        <Typography id="tableTitle" variant="subtitle1">
          {label}
        </Typography>
      )}
    </Title>
    <Spacer />
    <div>{selectedIds.length > 0 && <BulkActions deleteBulk={deleteRecords} selectedIds={selectedIds} />}</div>
  </SimpleToolbar>
)

export default TableToolbar
