import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import { SimpleList } from 'shared/table-elements'
import * as dateFns from 'date-fns'

const columns = [
  { id: 'logoUrl', label: 'brand', type: 'image', width: '10%' },
  { id: 'products', label: 'products', width: '40%' },
  { id: 'time', label: 'date', width: '35%', align: 'center' },
  { id: 'revenue', label: 'revenue', width: '15%', align: 'right', font: 'bold' },
]

const Orders = ({ orders }) => {
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

export default Orders