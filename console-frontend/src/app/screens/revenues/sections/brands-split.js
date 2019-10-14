import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { SimpleList } from 'shared/table-elements'

const BrandsSplit = ({ orders, width }) => {
  const columns = isWidthUp('sm', width)
    ? [
        { id: 'logoUrl', label: 'Brand', type: 'image', width: '10%' },
        { id: 'name', label: '', width: '60%' },
        { id: 'orders', label: 'Orders', width: '15%', align: 'right' },
        { id: 'revenue', label: 'Revenue', width: '15%', align: 'right', font: 'bold' },
      ]
    : [
        { id: 'logoUrl', label: 'Brand', type: 'image', width: '10%', align: 'left' },
        { id: 'orders', label: 'Orders', width: '40%', align: 'right' },
        { id: 'revenue', label: 'Revenue', width: '50%', align: 'right', font: 'bold' },
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

  return <SimpleList columns={columns} records={brandsSplit} />
}

export default withWidth()(BrandsSplit)
