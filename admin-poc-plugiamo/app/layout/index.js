import CustomAppBar from './appbar'
import { Layout } from 'react-admin'
import React from 'react'

const CustomLayout = props => <Layout {...props} appBar={CustomAppBar} title="customLayout" />

export default CustomLayout
