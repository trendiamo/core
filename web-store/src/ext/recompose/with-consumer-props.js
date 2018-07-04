// https://github.com/acdlite/recompose/issues/609
// https://codesandbox.io/s/znn65pknlx?expanddevtools=1

import React from 'react'

const withConsumerProps = (ConsumerComponent, propsMapper, renderPropName = 'children') => BaseComponent => {
  const baseFactory = React.createFactory(BaseComponent)
  const consumerFactory = React.createFactory(ConsumerComponent)

  const WithConsumerProps = props =>
    consumerFactory({
      [renderPropName]: consumerProps => baseFactory({ ...props, ...propsMapper(consumerProps) }),
    })

  return WithConsumerProps
}

export default withConsumerProps
