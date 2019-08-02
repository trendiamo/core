import React from 'react'
import { AssignmentTurnedInOutlined, PersonPinOutlined, SmsOutlined } from '@material-ui/icons'

const moduleIconsArray = {
  Showcase: <PersonPinOutlined />,
  Outro: <AssignmentTurnedInOutlined />,
  SimpleChat: <SmsOutlined />,
}

const moduleIcon = moduleType => {
  return moduleIconsArray[moduleType] || null
}

export default moduleIcon
