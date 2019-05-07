import Background from 'simple-chat/components/cover/background'
import Content from 'simple-chat/components/cover/content'
import CoverBase from 'shared/cover'
import React from 'react'

const CoverBridge = ({ header, minimized, headerConfig, clickActions }) => (
  <CoverBase backgroundColor={header.backgroundColor} hackathon headerConfig={headerConfig} minimized={minimized}>
    <Background header={header} headerConfig={headerConfig} minimized={minimized} />
    <Content clickActions={clickActions} header={header} headerConfig={headerConfig} minimized={minimized} />
  </CoverBase>
)

export default CoverBridge
