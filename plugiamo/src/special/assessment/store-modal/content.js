import styled from 'styled-components'
import { AssessmentProducts } from 'special/assessment/message-types'
import { clickAssessmentProduct } from 'special/assessment/utils'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const Container = styled.div`
  padding: 20px;
`

const styleConfig = {
  image: {
    height: 300,
  },
  card: {
    minWidth: 120,
    margin: 0,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  },
  details: {
    padding: '8px 10px 10px',
  },
  highlightText: {
    padding: '4px 14px 4px 12px',
  },
}

const ContentTemplate = ({ results, onClick }) => (
  <Container>
    <AssessmentProducts big data={results} onClick={onClick} styleConfig={styleConfig} />
  </Container>
)

const Content = compose(
  withState('logs', 'setLogs', []),
  withState('minHeight', 'setMinHeight', 0),
  withHandlers({
    onClick: () => ({ item }) => {
      clickAssessmentProduct(item)
    },
  })
)(ContentTemplate)

export default Content
