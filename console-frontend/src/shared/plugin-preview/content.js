import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, lifecycle, renderNothing, withProps, withState } from 'recompose'
import { ContentWrapper, FrameBase } from 'plugin-base'

const ContentContainerTemplate = styled(props => <FrameBase {...omit(props, ['entry', 'setEntry', 'isUnmounting'])} />)`
  border: 0;
  overflow: hidden;
  border-radius: 8px;
  width: 360px;
  height: 500px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  position: relative;
  margin-bottom: 30px;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transform: ${({ entry, isUnmounting }) => (entry || isUnmounting ? 'translateY(20px)' : 'none')};
  transition: opacity 0.25s ease, transform 0.4s ease;
  z-index: 10;
`

const ContentContainer = compose(
  withState('entry', 'setEntry', true),
  lifecycle({
    componentDidMount() {
      const { setEntry } = this.props
      setTimeout(() => {
        setEntry(false)
      }, 10)
    },
  })
)(ContentContainerTemplate)

const Content = ({ contentRef, Base }) => (
  <ContentContainer iframeRef={contentRef}>
    <ContentWrapper>{Base}</ContentWrapper>
  </ContentContainer>
)

export default compose(
  branch(({ showingContent }) => !showingContent, renderNothing),
  withProps({ contentRef: React.createRef() })
)(Content)
