import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Collapse, IconButton } from '@material-ui/core'
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

const HeaderBar = ({ dragHandle, ellipsize, isFoldedByLogic, toggleFolded, folded, foldable, title, actions }) => (
  <FlexBar>
    {dragHandle && <DragHandle />}
    <Header ellipsize={ellipsize} variant="subtitle1">
      {title}
    </Header>
    {actions}
    {foldable && <FoldButton folded={folded} isFoldedByLogic={isFoldedByLogic} toggleFolded={toggleFolded} />}
  </FlexBar>
)

const FormSection = ({
  backgroundColor,
  dragHandle,
  title,
  children,
  folded: defaultFolded,
  ellipsize,
  foldable,
  actions,
  hideTop,
  hideBottom,
  isFoldedByLogic,
  setIsFoldedByLogic,
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
