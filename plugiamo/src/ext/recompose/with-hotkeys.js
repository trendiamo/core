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

const getIframeContentWindow = base => {
  const iframes = base && base.getElementsByTagName('iframe')
  if (iframes.length && iframes[0]) return base.getElementsByTagName('iframe')[0].contentWindow
}

const withHotkeys = (handlers, useCapture = false) =>
  hoistStatics(
    BaseComponent =>
      class WithHotkeys extends Component {
        displayName = wrapDisplayName(BaseComponent, 'withHotkeys')

        componentDidMount() {
          this.manageKeyEvents('add')
        }

        componentWillUnmount() {
          this.manageKeyEvents('remove')
        }

        setRef(ref) {
          if (!ref) return
          BaseComponent.hotkeysRef = ref
        }

        manageKeyEvents = type => {
          // we listen for the event in both the element itself and on its containing window. This allows modals to work
          const { base } = BaseComponent.hotkeysRef
          const target = base.contentWindow || getIframeContentWindow(base) || window
          if (type === 'add') {
            base.addEventListener('keyup', this.handleKeyDown, useCapture)
            target.addEventListener('keyup', this.handleKeyDown, useCapture)
            return
          }
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
          return <BaseComponent ref={this.setRef} {...this.props} />
        }
      }
  )

const escapeKey = 27

export { escapeKey }
export default withHotkeys
