import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import SimpleList from 'shared/table-elements/simple-list'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import * as dateFns from 'date-fns'

const Orders = ({ orders, width }) => {
  const columns = isWidthUp('sm', width)
    ? [
        { id: 'logoUrl', label: 'Brand', width: '10%', variant: 'image' },
        { id: 'products', label: 'Products', width: '40%' },
        { id: 'time', label: 'Date', width: '35%', align: 'right' },
        { id: 'revenue', label: 'Revenue', width: '15%', align: 'right', variant: 'h6' },
      ]
    : [
        { id: 'logoUrl', label: 'Brand', width: '10%', variant: 'image' },
        { id: 'time', label: 'Date', width: '50%', align: 'right' },
        { id: 'revenue', label: 'Revenue', width: '40%', align: 'right', variant: 'h6' },
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

  return (
    <SimpleList
      columns={columns}
      records={filteredOrders}
      stickyHeader={isWidthUp('md', width)}
      withPagination={isWidthUp('md', width)}
    />
  )
}

export default withWidth()(Orders)
