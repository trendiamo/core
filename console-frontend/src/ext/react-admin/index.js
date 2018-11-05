import Button from '@material-ui/core/Button'
import Create from '@material-ui/icons/Create'
import { Link } from 'react-router-dom'
import { linkToRecord } from 'ra-core'
import { Datagrid as RaDataGrid } from 'react-admin'
import React from 'react'
import RemoveRedEye from '@material-ui/icons/RemoveRedEye'
import styled from 'styled-components'

const Datagrid = styled(RaDataGrid)`
  thead tr {
    background-color: #fafafa;
  }

  th {
    border-top: 1px solid #dfe0df;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.3px;
    color: #555;
    text-transform: uppercase;
  }

  tbody tr {
    background-color: #fff;
  }
`

const EditButton = ({ basePath = '', label = 'ra.action.edit', record = {}, ...rest }) => (
  <Button component={Link} label={label} size="small" to={linkToRecord(basePath, record.id)} {...rest}>
    <Create />
  </Button>
)

const ShowButton = ({ basePath = '', label = 'ra.action.show', record = {}, ...rest }) => (
  <Button component={Link} label={label} size="small" to={`${linkToRecord(basePath, record.id)}/show`} {...rest}>
    <RemoveRedEye />
  </Button>
)

export { Datagrid, EditButton, ShowButton }
