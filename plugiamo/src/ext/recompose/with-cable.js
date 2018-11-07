// adaped from https://github.com/cpunion/react-actioncable-provider
import actioncable from 'actioncable'
import { Component, h } from 'preact'
import { hoistStatics, wrapDisplayName } from 'recompose'

const withCable = (url, channel, handlers) =>
  hoistStatics(
    BaseComponent =>
      class WithCable extends Component {
        displayName = wrapDisplayName(BaseComponent, 'withCable')

        componentDidMount() {
          this.consumer = actioncable.createConsumer(url)
          this.subscription = this.consumer.subscriptions.create(
            typeof channel === 'function' ? channel(this.props) : channel,
            typeof handlers === 'function' ? handlers(this.props) : handlers
          )
        }

        componentWillUnmount() {
          if (this.subscription) this.consumer.subscriptions.remove(this.subscription)
          if (this.consumer) this.consumer.disconnect()
        }

        render() {
          return <BaseComponent cable={this.subscription} ref={this.setRef} {...this.props} />
        }
      }
  )

export default withCable
