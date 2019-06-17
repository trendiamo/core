import { Component } from 'preact'
import { Rollbar } from 'ext/rollbar'

class ErrorBoundaries extends Component {
  componentDidCatch(error) {
    Rollbar.error(error)
  }

  render() {
    const { children } = this.props
    return children
  }
}

export default ErrorBoundaries
