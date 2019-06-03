import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { ProductMessage } from 'plugin-base'

const styleConfigDefault = {
  image: {
    height: 200,
  },
  card: {
    minWidth: 120,
    margin: 0,
    borderRadius: '12px',
  },
  details: {
    padding: '8px 8px 9px',
  },
  detailsText: {
    fontSize: '14px',
  },
  detailsPrice: {
    fontSize: '14px',
  },
  highlightText: {
    top: '65%',
  },
  container: {
    padding: '0 5px 10px',
  },
}

const highlightDefault = {
  text: 'Best Seller',
  backgroundColor: '#fa0',
  textColor: '#fff',
}

const Container = styled.div`
  width: ${({ cols }) => 100 / cols}%;
  padding: 0 10px 20px;
  position: relative;
`

const HighlightContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 4px solid ${({ highlight }) => highlight.backgroundColor};
  border-radius: 12px;
  pointer-events: none;
`

const HighlightText = styled.div`
  position: absolute;
  top: 75%;
  left: 0;
  font-weight: 500;
  background-color: ${({ highlight }) => highlight.backgroundColor};
  color: ${({ highlight }) => highlight.textColor};
  padding: 3px 12px 3px 10px;
  border-radius: 0 12px 12px 0;
  user-select: none;
`

const InnerContainer = styled.div`
  position: relative;
`

const Highlight = ({ highlight, styleConfig }) => (
  <HighlightContainer highlight={highlight} style={styleConfig.highlight}>
    <HighlightText highlight={highlight} style={styleConfig.highlightText}>
      {highlight.text}
    </HighlightText>
  </HighlightContainer>
)

const AssessmentProduct = ({ data, onClick, big, styleConfig = styleConfigDefault }) => (
  <Container cols={big ? 3 : 2} style={styleConfig.container}>
    <InnerContainer>
      {data.highlight && <Highlight highlight={highlightDefault} styleConfig={styleConfig} />}
      <ProductMessage onClick={onClick} product={data} styleConfig={styleConfig} />
    </InnerContainer>
  </Container>
)

export default compose(
  withHandlers({
    onClick: ({ data, onClick }) => () => {
      onClick({ type: 'clickAssessmentProduct', item: data })
    },
  })
)(AssessmentProduct)
