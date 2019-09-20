import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import { SimpleList } from 'shared/table-elements'

const columns = [
  { id: 'logoUrl', label: 'brand', type: 'image', width: '10%' },
  { id: 'name', label: '', width: '60%' },
  { id: 'orders', label: 'items', width: '15%', align: 'center' },
  { id: 'revenue', label: 'revenue', width: '15%', align: 'right', font: 'bold' },
]

const BrandsSplit = ({ orders }) => {
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

export default BrandsSplit
