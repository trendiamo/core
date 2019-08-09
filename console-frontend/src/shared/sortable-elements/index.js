import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Reorder } from '@material-ui/icons'
import {
  SortableContainer as SortableContainerHoc,
  SortableElement as SortableElementHoc,
  SortableHandle,
} from 'react-sortable-hoc'

const ReorderIcon = styled(props => <Reorder {...omit(props, ['visible'])} />)`
  cursor: ns-resize;
  color: rgba(0, 0, 0, 0.54);
  margin-right: 1rem;
  ${({ visible }) => (!visible ? 'visibility: hidden' : '')}
`

export const DragHandle = SortableHandle(ReorderIcon)

// receives sortIndex, and passes it as index to received Component
export const SortableElement = Component =>
  SortableElementHoc(({ sortIndex, ...props }) => <Component index={sortIndex} {...omit(props, ['sortIndex'])} />)

export const SortableContainer = Component =>
  SortableContainerHoc(props => <Component {...props} lockAxis="y" lockOffset="0%" lockToContainerEdges />)
