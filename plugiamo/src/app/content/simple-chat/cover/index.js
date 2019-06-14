import CoverAssessment from 'special/assessment/cover'
import CoverBridge from 'special/bridge/cover'
import { h } from 'preact'
import { SimpleChatCover } from 'plugin-base'

const SimpleChatCover0 = props => {
  const { assessment, bridge } = props

  if (bridge) return <CoverBridge {...props} />
  if (assessment) return <CoverAssessment {...props} />

  return <SimpleChatCover {...props} />
}

export default SimpleChatCover0
