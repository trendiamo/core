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

import { h } from 'preact'
import { useCallback, useEffect, useRef } from 'preact/hooks'

const withHotkeys = (handlers, useCapture = false) => BaseComponent => {
  const WithHotkeys = props => {
    const hotkeysRef = useRef()

    const handleKeyDown = useCallback(event => {
      const handler = handlers[event.keyCode]
      if (!handler) return
      const handlerWithProps = Reflect.apply(handler, this, [props])

      event.preventDefault()
      event.stopPropagation()
      Reflect.apply(handlerWithProps, this, [event])
    }, [])

    const manageKeyEvents = useCallback(type => {
      // we listen for the event in both the element itself and on its containing window. This allows modals to work
      const { hotkeysDocument } = props
      const contentDocument =
        hotkeysDocument && (typeof hotkeysDocument === 'function' ? hotkeysDocument() : hotkeysDocument)
      const base = hotkeysRef.current
      const target = base.contentWindow || contentDocument || window
      if (type === 'add') {
        base.addEventListener('keyup', handleKeyDown, useCapture)
        target.addEventListener('keyup', handleKeyDown, useCapture)
        return
      }
      base.removeEventListener('keyup', handleKeyDown, useCapture)
      target.removeEventListener('keyup', handleKeyDown, useCapture)
    }, [])

    useEffect(() => {
      manageKeyEvents('add')
      return () => manageKeyEvents('remove')
    }, [])

    return (
      <div ref={hotkeysRef}>
        <BaseComponent {...props} />
      </div>
    )
  }

  return WithHotkeys
}

const escapeKey = 27

export { escapeKey }
export default withHotkeys
