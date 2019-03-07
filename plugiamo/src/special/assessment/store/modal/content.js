import styled from 'styled-components'
import { AssessmentProducts } from 'app/content/scripted-chat/components/message-types'
import { compose, withState } from 'recompose'
import { h } from 'preact'

const Container = styled.div`
  margin: 0 20px;
`

const ContentTemplate = ({ results }) => (
  <Container>
    <AssessmentProducts big data={results} />
  </Container>
)

const Content = compose(
  withState('logs', 'setLogs', []),
  withState('minHeight', 'setMinHeight', 0)
)(ContentTemplate)

export default Content
