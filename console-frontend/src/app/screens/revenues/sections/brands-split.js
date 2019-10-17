import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import SimpleList from 'shared/table-elements/simple-list'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const BrandsSplit = ({ orders, width }) => {
  const columns = isWidthUp('sm', width)
    ? [
        { id: 'logoUrl', label: 'Brand', width: '10%', variant: 'image' },
        { id: 'name', label: '', width: '60%' },
        { id: 'orders', label: 'Orders', width: '15%', align: 'right' },
        { id: 'revenue', label: 'Revenue', width: '15%', align: 'right', variant: 'h6' },
      ]
    : [
        { id: 'logoUrl', label: 'Brand', width: '10%', align: 'left', variant: 'image' },
        { id: 'orders', label: 'Orders', width: '50%', align: 'right' },
        { id: 'revenue', label: 'Revenue', width: '40%', align: 'right', variant: 'h6' },
      ]

  const brandsSplit = useMemo(
    () =>
      orders
        .reduce((result, order) => {
          const brandSplit = result.find(brandSplit => brandSplit.name === order.brand.name)
          if (brandSplit) {
            brandSplit.revenue += +order.sellerAmount
            brandSplit.orders += 1
          } else {
            result.push({
              id: order.id,
              revenue: +order.sellerAmount,
              orders: 1,
              name: order.brand.name,
              logoUrl: order.brand.logoUrl,
            })
          }
          return result
        }, [])
        .sort((a, b) => b.revenue - a.revenue)
        .map(brandSplit => ({
          revenue: `${brandSplit.revenue.toFixed(2)}${orders[0].currency}`,
          ...omit(brandSplit, ['revenue']),
        })),
    [orders]
  )

  return (
    <SimpleList
      columns={columns}
      records={brandsSplit}
      stickyHeader={isWidthUp('md', width)}
      withPagination={isWidthUp('md', width)}
    />
  )
}

export default withWidth()(BrandsSplit)
