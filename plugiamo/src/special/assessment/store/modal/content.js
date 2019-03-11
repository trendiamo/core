import styled from 'styled-components'
import { AssessmentProducts } from 'app/content/scripted-chat/components/message-types'
import { compose, withState } from 'recompose'
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
    borderRadius: '10px',
  },
  details: {
    padding: '8px 10px 10px',
  },
  highlightText: {
    padding: '4px 14px 4px 12px',
  },
}

const ContentTemplate = ({ results }) => (
  <Container>
    <AssessmentProducts big data={results} styleConfig={styleConfig} />
  </Container>
)

const Content = compose(
  withState('logs', 'setLogs', []),
  withState('minHeight', 'setMinHeight', 0)
)(ContentTemplate)

export default Content
