import React, { Component } from 'react'
import { hoistStatics, wrapDisplayName } from 'recompose'

const withRaTitle = title =>
  hoistStatics(
    BaseComponent =>
      class WithRaTitle extends Component {
        displayName = wrapDisplayName(BaseComponent, 'withRaTitle')

        componentDidMount() {
          const titleElement = document.querySelector('#admin-title')
          if (!titleElement) return
          titleElement.innerText = title
        }

        componentWillUnmount() {
          const titleElement = document.querySelector('#admin-title')
          if (!titleElement) return
          titleElement.innerText = ''
        }

        render() {
          return <BaseComponent {...this.props} />
        }
      }
  )

export default withRaTitle
