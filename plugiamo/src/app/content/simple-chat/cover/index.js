import CoverAssessment from 'special/assessment/cover'
import CoverBridge from 'special/bridge/cover'
import { branch, compose, renderComponent } from 'recompose'
import { SimpleChatCover } from 'plugin-base'

export default compose(
  branch(({ bridge }) => bridge, renderComponent(CoverBridge)),
  branch(({ assessment }) => assessment, renderComponent(CoverAssessment))
)(SimpleChatCover)
