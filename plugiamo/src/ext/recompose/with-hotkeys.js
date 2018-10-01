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

import { Component, h } from 'preact'
import { hoistStatics, wrapDisplayName } from 'recompose'

const withHotkeys = (handlers, useCapture = false) =>
  hoistStatics(
    BaseComponent =>
      class WithHotkeys extends Component {
        displayName = wrapDisplayName(BaseComponent, 'withHotkeys')

        componentDidMount() {
          const { contentWindow } = BaseComponent.hotkeysRef.base
          ;(contentWindow || window).addEventListener('keydown', this.handleKeyDown, useCapture)
        }

        componentWillUnmount() {
          const { contentWindow } = BaseComponent.hotkeysRef.base
          ;(contentWindow || window).removeEventListener('keydown', this.handleKeyDown, useCapture)
        }

        setRef(ref) {
          BaseComponent.hotkeysRef = ref
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
          return <BaseComponent ref={this.setRef} {...this.props} />
        }
      }
  )

const escapeKey = 27

export { escapeKey }
export default withHotkeys
