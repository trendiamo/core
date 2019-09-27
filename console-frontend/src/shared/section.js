import Divider from './form-elements/divider'
import omit from 'lodash.omit'
import React, { memo, useCallback, useMemo, useState } from 'react'
import SectionTitle from './form-elements/section-title'
import styled from 'styled-components'
import { Collapse, Paper } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledPaper = styled(props => <Paper {...omit(props, ['foldable'])} />)`
  align-items: center;
  display: flex;
  flex-direction: column;
  & + * {
    margin-top: ${showUpToUsBranding() ? '18px' : '10px'};
  }
  ${({ foldable }) => foldable && 'padding-top: 16px;'}
  ${showUpToUsBranding() &&
    'border-radius: 0; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.07);'}
`

const SectionContent = styled(props => <div {...omit(props, ['foldable'])} />)`
  padding: ${({ foldable }) => (!foldable ? (showUpToUsBranding() ? '16px' : '16px 24px') : '0')};
  height: 100%;
`

const Section = ({
  actions,
  className,
  children,
  title,
  ellipsizeTitle,
  foldable,
  dragHandle,
  hideDragHandle,
  ...props
}) => {
  const [folded, setFolded] = useState(false)

  const toggleFolded = useCallback(
    () => {
      setFolded(!folded)
    },
    [folded]
  )

  const showDivider = useMemo(() => !showUpToUsBranding() || foldable, [foldable])

  return (
    <StyledPaper className={className} elevation={4} foldable={foldable} {...props}>
      <Container>
        {title && (
          <>
            <SectionTitle
              actions={actions}
              dragHandle={dragHandle}
              ellipsize={ellipsizeTitle}
              foldable={foldable}
              folded={folded}
              hideDragHandle={hideDragHandle}
              title={title}
              toggleFolded={toggleFolded}
            />
            {showDivider && <Divider folded={folded} />}
          </>
        )}
        {foldable ? (
          <Collapse in={!folded} timeout="auto">
            <SectionContent foldable={foldable}>{children}</SectionContent>
          </Collapse>
        ) : (
          <SectionContent>{children}</SectionContent>
        )}
      </Container>
    </StyledPaper>
  )
}

export default memo(Section)
