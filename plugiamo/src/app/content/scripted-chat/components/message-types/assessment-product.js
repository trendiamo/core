import ProductMessage from './product-message'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'

const styleConfig = {
  imageHeight: 200,
  minWidth: 120,
  margin: 0,
}

const Container = styled.div`
  width: ${({ cols }) => 100 / cols}%;
  padding: 5px;
  position: relative;
`

const HighlightContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 3px solid ${({ highlight }) => highlight.backgroundColor};
  margin: 5px;
  border-radius: 7px;
  cursor: pointer;
`

const HighlightText = styled.div`
  position: absolute;
  top: 65%;
  left: 0;
  background-color: ${({ highlight }) => highlight.backgroundColor};
  color: ${({ highlight }) => highlight.textColor};
  padding: 3px 12px 3px 10px;
  border-radius: 0 12px 12px 0;
  user-select: none;
`

const Highlight = ({ highlight }) => (
  <HighlightContainer highlight={highlight}>
    <HighlightText highlight={highlight}>{highlight.text}</HighlightText>
  </HighlightContainer>
)

const AssessmentProductTemplate = ({ data, onClick, big }) => (
  <Container cols={big ? 3 : 2}>
    {data.highlight && <Highlight highlight={data.highlight} />}
    <ProductMessage onClick={onClick} product={data} styleConfig={styleConfig} />
  </Container>
)

const AssessmentProduct = compose(
  withHandlers({
    onClick: () => () => {
      // TODO: click product
    },
  })
)(AssessmentProductTemplate)

export default AssessmentProduct
