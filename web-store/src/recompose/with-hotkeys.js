// https://gist.github.com/mminer/abc255772c702582cd199b973dd29e39

// Usage:
//
// const backspace = 8;
//
// export default withHotkeys({
//   [backspace]: props => evt => {
//     ...
//   },
// })(YourComponent);

import { hoistStatics, wrapDisplayName } from 'recompose'
import React, { Component } from 'react'

const withHotkeys = (handlers, useCapture = false) =>
  hoistStatics(
    BaseComponent =>
      class WithHotkeys extends Component {
        displayName = wrapDisplayName(BaseComponent, 'withHotkeys')

        componentDidMount() {
          window.addEventListener('keydown', this.handleKeyDown, useCapture)
        }

        componentWillUnmount() {
          window.removeEventListener('keydown', this.handleKeyDown, useCapture)
        }

        handleKeyDown = event => {
          const handler = handlers[event.keyCode]

          if (!handler) {
            return
          }

          const handlerWithProps = Reflect.apply(handler, this, [this.props])

          if (!handlerWithProps) {
            return
          }

          event.preventDefault()
          event.stopPropagation()
          Reflect.apply(handlerWithProps, this, [event])
        }

        render() {
          return <BaseComponent {...this.props} />
        }
      }
  )

const escapeKey = 27

export { escapeKey }
export default withHotkeys
