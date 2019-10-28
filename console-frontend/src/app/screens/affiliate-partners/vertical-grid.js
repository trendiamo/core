import React, { useMemo } from 'react'
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth'

const ColumnContainer = styled.div`
  width: ${({ separation }) => 100 / separation}%;
  margin: 0 7px;
`

const GridContainer = styled.div`
  display: flex;
  width: calc(100% + 14px);
  margin: 0 -7px;
`

// This component was created because there was no out-of-the-box solution in MUI package for this kind of grid
// layout (vertical) and other packages seemed pretty heavy or with a lot of unnecessary functionality for that.
const VerticalGrid = ({ children, width, xs = 12, sm = 6, md = 6, lg = 4, xl = 2 }) => {
  const sizes = useMemo(
    () => ({
      xs,
      sm,
      md,
      lg,
      xl,
    }),
    [lg, md, sm, xl, xs]
  )

  const separation = useMemo(() => Math.round(12 / sizes[width]), [sizes, width])

  const columns = useMemo(
    () => {
      let columnsArray = []
      for (let i = 0; i < separation; i++) {
        columnsArray.push(i)
      }
      return columnsArray
    },
    [separation]
  )

  return (
    <GridContainer>
      {columns.map((column, columnId) => (
        <ColumnContainer key={column} separation={separation}>
          {children.map((child, index) => (index % separation === columnId ? child : null))}
        </ColumnContainer>
      ))}
    </GridContainer>
  )
}

export default withWidth()(VerticalGrid)
