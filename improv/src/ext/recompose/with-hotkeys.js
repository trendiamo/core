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

import React from 'react'
import { hoistStatics, wrapDisplayName } from 'recompose'

const withHotkeys = (handlers, useCapture = false) =>
  hoistStatics(
    BaseComponent =>
      class WithHotkeys extends React.Component {
        displayName = wrapDisplayName(BaseComponent, 'withHotkeys')

        constructor() {
          super()
          this.hotkeysRef = React.createRef()
        }

        componentDidMount() {
          // we listen for the event in both the element itself and on its containing window. This allows modals to work
          const { hotkeysDocument } = this.props
          const contentDocument =
            hotkeysDocument && (typeof hotkeysDocument === 'function' ? hotkeysDocument() : hotkeysDocument)
          const base = this.hotkeysRef.current
          const target = base.contentWindow || contentDocument || window
          base.addEventListener('keyup', this.handleKeyDown, useCapture)
          target.addEventListener('keyup', this.handleKeyDown, useCapture)
        }

        componentWillUnmount() {
          // we listen for the event in both the element itself and on its containing window. This allows modals to work
          const { hotkeysDocument } = this.props
          const contentDocument =
            hotkeysDocument && (typeof hotkeysDocument === 'function' ? hotkeysDocument() : hotkeysDocument)
          const base = this.hotkeysRef.current
          const target = base.contentWindow || contentDocument || window
          base.removeEventListener('keyup', this.handleKeyDown, useCapture)
          target.removeEventListener('keyup', this.handleKeyDown, useCapture)
        }

        handleKeyDown = event => {
          const handler = handlers[event.keyCode]
          if (!handler) return
          const handlerWithProps = Reflect.apply(handler, this, [this.props])

          event.preventDefault()
          event.stopPropagation()
          Reflect.apply(handlerWithProps, this, [event])
        }

        render() {
          return (
            <div ref={this.hotkeysRef}>
              <BaseComponent {...this.props} />
            </div>
          )
        }
      }
  )

const escapeKey = 27

export { escapeKey }
export default withHotkeys
