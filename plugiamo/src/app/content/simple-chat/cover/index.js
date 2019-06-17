import CoverAssessment from 'special/assessment/cover'
import { h } from 'preact'
import { SimpleChatCover } from 'plugin-base'

const SimpleChatCover0 = props => {
  const { assessment } = props

  if (assessment) return <CoverAssessment {...props} />

  return <SimpleChatCover {...props} />
}

export default SimpleChatCover0
