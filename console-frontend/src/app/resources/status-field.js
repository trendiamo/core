import React from 'react'
import { ChipField } from 'react-admin'

var statusStyles = {
  DRAFT: {
    background: '#4a90e2',
    color: '#fff',
  },
  PUBLISHED: {
    background: '#04fb50',
    color: '#fff',
  },
  ARCHIVED: {
    background: '#fb7604',
    color: '#fff',
  },
}

const StatusField = ({ source, record = {} }) => {
  return <ChipField record={record} source={source} style={statusStyles[record.status]} />
}

export default StatusField
