import IconButton from './icon-button'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Collapse } from '@material-ui/core'
import { Divider, FlexBar, Header } from './index'
import { DragHandle } from 'shared/sortable-elements'
import { ExpandMore } from '@material-ui/icons'

const FoldIcon = styled(props => <ExpandMore {...omit(props, ['folded'])} />)`
  transform: rotate(${({ folded }) => (folded ? '0deg' : '540deg')});
  transition: transform 0.6s;
`

const SectionContainer = styled.div`
  margin: 0;
  ${({ backgroundColor }) => (backgroundColor ? `background-color: ${backgroundColor};` : null)}
`

const Content = styled.div`
  margin: 0px 0 16px;
`

const FoldButton = ({ isFoldedByLogic, folded, toggleFolded }) => (
  <IconButton aria-expanded={!(isFoldedByLogic || folded)} aria-label="Show more" onClick={toggleFolded}>
    <FoldIcon folded={isFoldedByLogic || folded} />
  </IconButton>
)

const HeaderBar = ({
  actions,
  dragHandle,
  ellipsize,
  foldable,
  folded,
  isFoldedByLogic,
  hideDragHandle,
  title,
  toggleFolded,
}) => (
  <FlexBar>
    {dragHandle && <DragHandle hidden={hideDragHandle} />}
    <Header ellipsize={ellipsize} variant="subtitle1">
      {title}
    </Header>
    {actions}
    {foldable && <FoldButton folded={folded} isFoldedByLogic={isFoldedByLogic} toggleFolded={toggleFolded} />}
  </FlexBar>
)

const FormSection = ({
  actions,
  backgroundColor,
  children,
  dragHandle,
  ellipsize,
  foldable,
  folded: defaultFolded,
  hideBottom,
  hideDragHandle,
  hideTop,
  isFoldedByLogic,
  setIsFoldedByLogic,
  title,
}) => {
  const [folded, setFolded] = useState(defaultFolded)

  const toggleFolded = useCallback(
    () => {
      setIsFoldedByLogic && setIsFoldedByLogic(!folded)
      setFolded(!folded)
    },
    [folded, setIsFoldedByLogic]
  )

  return (
    <SectionContainer backgroundColor={backgroundColor}>
      {!hideTop && <Divider />}
      <HeaderBar
        actions={actions}
        dragHandle={dragHandle}
        ellipsize={ellipsize}
        foldable={foldable}
        folded={folded}
        hideDragHandle={hideDragHandle}
        isFoldedByLogic={isFoldedByLogic}
        title={title}
        toggleFolded={toggleFolded}
      />
      {!hideBottom && <Divider folded={isFoldedByLogic || folded} />}
      <Collapse in={isFoldedByLogic !== undefined ? !isFoldedByLogic : !folded} timeout="auto">
        <Content>{children}</Content>
      </Collapse>
    </SectionContainer>
  )
}

export default FormSection
