import React from 'react'
import Typography from '@material-ui/core/Typography'
import { compose, lifecycle } from 'recompose'
import { withStoreConsumer } from './with-store'

const Title = ({ title }) => (
  <Typography color="default" variant="h6">
    {title}
  </Typography>
)

export const withTitle = title => BaseComponent =>
  compose(
    withStoreConsumer,
    lifecycle({
      componentDidMount() {
        const { setStore } = this.props
        if (typeof title === 'function') title = title(this.props)
        setStore({ appBarContent: <Title title={title} /> })
      },
    })
  )(BaseComponent)
