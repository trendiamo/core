import omit from 'lodash.omit'
import React, { createElement, useCallback, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Reorder } from '@material-ui/icons'
import {
  SortableContainer as SortableContainerHoc,
  SortableElement as SortableElementHoc,
  SortableHandle,
} from 'react-sortable-hoc'

const ReorderIcon = styled(props => <Reorder {...omit(props, ['hidden', 'highlight'])} />)`
  cursor: ns-resize;
  margin-right: 1rem;
  color: ${({ highlight }) => (highlight ? '#fff' : 'rgba(0, 0, 0, 0.54)')};
  ${({ hidden }) => hidden && 'visibility: hidden;'}
`

// avoid text highlighting bug in Safari (see https://github.com/clauderic/react-sortable-hoc/issues/253)
const NoSelectStyle = createGlobalStyle`
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`

export const DragHandle = SortableHandle(ReorderIcon)

// receives sortIndex, and passes it as index to received Component
export const SortableElement = Component =>
  SortableElementHoc(({ sortIndex, ...props }) => <Component index={sortIndex} {...omit(props, ['sortIndex'])} />)

const BaseSortableContainer = SortableContainerHoc(({ children, wrapper = 'div' }) =>
  createElement(wrapper, null, children)
)

export const SortableContainer = ({ children, ...props }) => {
  const [isSorting, setIsSorting] = useState(false)
  const { helperClass, onSortEnd, onSortStart } = props

  const newOnSortEnd = useCallback(
    (options, event) => {
      setIsSorting(false)
      if (onSortEnd) onSortEnd(options, event)
    },
    [onSortEnd]
  )

  const newOnSortStart = useCallback(
    (options, event) => {
      setIsSorting(true)
      event.preventDefault()
      if (onSortStart) onSortStart(options, event)
    },
    [onSortStart]
  )

  return (
    <BaseSortableContainer
      helperClass={helperClass || 'sortable-element'}
      lockAxis="y"
      lockOffset="0%"
      onSortEnd={newOnSortEnd}
      onSortStart={newOnSortStart}
      useDragHandle
      useWindowAsScrollContainer
      {...omit(props, ['onSortEnd', 'onSortStart'])}
    >
      {children}
      {isSorting && <NoSelectStyle />}
    </BaseSortableContainer>
  )
}
