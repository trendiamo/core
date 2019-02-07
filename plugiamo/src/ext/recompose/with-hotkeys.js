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
          // we listen for the event in both the element itself and on its containing window. This allows modals to work
          const { base } = BaseComponent.hotkeysRef
          const target = base.contentWindow || window
          base.addEventListener('keyup', this.handleKeyDown, useCapture)
          target.addEventListener('keyup', this.handleKeyDown, useCapture)
        }

        componentWillUnmount() {
          // we listen for the event in both the element itself and on its containing window. This allows modals to work
          const { base } = BaseComponent.hotkeysRef
          const target = base.contentWindow || window
          base.removeEventListener('keyup', this.handleKeyDown, useCapture)
          target.removeEventListener('keyup', this.handleKeyDown, useCapture)
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
