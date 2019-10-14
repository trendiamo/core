import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { SimpleList } from 'shared/table-elements'
import * as dateFns from 'date-fns'

const Orders = ({ orders, width }) => {
  const columns = isWidthUp('sm', width)
    ? [
        { id: 'logoUrl', label: 'Brand', type: 'image', width: '10%' },
        { id: 'products', label: 'Products', width: '40%' },
        { id: 'time', label: 'Date', width: '35%', align: 'right' },
        { id: 'revenue', label: 'Revenue', width: '15%', align: 'right', font: 'bold' },
      ]
    : [
        { id: 'logoUrl', label: 'Brand', type: 'image', width: '10%' },
        { id: 'time', label: 'Date', width: '40%', align: 'right' },
        { id: 'revenue', label: 'Revenue', width: '50%', align: 'right', font: 'bold' },
      ]

  const filteredOrders = useMemo(
    () =>
      orders
        .map(order => {
          return {
            logoUrl: order.brand.logoUrl,
            products: order.products.map(product => `${product.quantity} ${product.name}`).join(', '),
            capturedAt: new Date(order.capturedAt),
            revenue: order.products.reduce((revenue, product) => (revenue += +product.sellerAmount), 0),
          }
        })
        .sort((a, b) => b.capturedAt - a.capturedAt)
        .map(order => ({
          revenue: `${order.revenue}${orders[0].currency}`,
          time: `${dateFns.formatDistance(order.capturedAt, new Date())} ago`,
          ...omit(order, ['capturedAt', 'revenue']),
        })),
    [orders]
  )

  return <SimpleList columns={columns} records={filteredOrders} sticky />
}

export default withWidth()(Orders)
