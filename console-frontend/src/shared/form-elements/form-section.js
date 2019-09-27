import Divider from './divider'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'
import { Collapse } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const SectionContainer = styled.div`
  position: relative;
  ${({ backgroundColor }) => (backgroundColor ? `background-color: ${backgroundColor};` : null)}
`

const Content = styled(props => <div {...omit(props, ['manualPadding'])} />)`
  ${({ manualPadding }) => !manualPadding && `padding: 0px ${showUpToUsBranding() ? '16px' : '24px'} 16px;`}
`

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
  title,
  manualPadding,
}) => {
  const [folded, setFolded] = useState(defaultFolded)

  const toggleFolded = useCallback(
    () => {
      setFolded(!folded)
    },
    [folded]
  )

  return (
    <SectionContainer backgroundColor={backgroundColor}>
      {!hideTop && <Divider />}
      <SectionTitle
        actions={actions}
        dragHandle={dragHandle}
        ellipsize={ellipsize}
        foldable={foldable}
        folded={folded}
        hideDragHandle={hideDragHandle}
        isFormSectionTitle
        title={title}
        toggleFolded={toggleFolded}
      />
      {!hideBottom && <Divider folded={folded} />}
      <Collapse in={!folded} timeout="auto">
        <Content manualPadding={manualPadding}>{children}</Content>
      </Collapse>
    </SectionContainer>
  )
}

export default FormSection
