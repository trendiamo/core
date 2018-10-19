import { ChipField } from 'react-admin'
import React from 'react'

var statusStyles = {
  ARCHIVED: {
    background: '#fb7604',
    color: '#fff',
  },
  DRAFT: {
    background: '#4a90e2',
    color: '#fff',
  },
  PUBLISHED: {
    background: '#04fb50',
    color: '#fff',
  },
}

const StatusField = ({ source, record = {} }) => {
  return <ChipField record={record} source={source} style={statusStyles[record.status]} />
}

export default StatusField
