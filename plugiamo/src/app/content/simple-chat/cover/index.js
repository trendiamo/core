import CoverAssessment from 'special/assessment/cover'
import { h } from 'preact'
import { SimpleChatCover as SimpleChatCoverBase } from 'plugin-base'

const SimpleChatCover = props => {
  const { assessment } = props

  if (assessment) return <CoverAssessment {...props} />

  return <SimpleChatCoverBase {...props} />
}

export default SimpleChatCover
