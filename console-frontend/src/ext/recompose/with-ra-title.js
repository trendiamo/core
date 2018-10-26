import { hoistStatics, wrapDisplayName } from 'recompose'
import React, { Component } from 'react'

const withRaTitle = title =>
  hoistStatics(
    BaseComponent =>
      class WithRaTitle extends Component {
        displayName = wrapDisplayName(BaseComponent, 'withRaTitle')

        componentDidMount() {
          const titleElement = document.querySelector('#react-admin-title')
          titleElement.innerText = title
        }

        componentWillUnmount() {
          const titleElement = document.querySelector('#react-admin-title')
          titleElement.innerText = ''
        }

        render() {
          return <BaseComponent {...this.props} />
        }
      }
  )

export default withRaTitle
