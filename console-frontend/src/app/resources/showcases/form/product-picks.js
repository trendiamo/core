import ProductPick from './product-pick'
import React, { useMemo } from 'react'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableProductPick = SortableElement(ProductPick)

const ProductPicks = ({
  isCropping,
  isFormLoading,
  isUploaderLoading,
  onFocus,
  sellerId,
  productPicksAttributes,
  setIsCropping,
  setIsUploaderLoading,
  setProductPickForm,
}) => {
  const allowDelete = useMemo(() => productPicksAttributes.filter(productPick => !productPick._destroy).length > 1, [
    productPicksAttributes,
  ])

  return (
    <div>
      {productPicksAttributes.map((productPick, index) =>
        productPick._destroy ? null : (
          <SortableProductPick
            allowDelete={allowDelete}
            folded={productPick.id}
            index={index}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            isUploaderLoading={isUploaderLoading}
            key={productPick.id || productPick.__key}
            onFocus={onFocus}
            productPick={productPick}
            sellerId={sellerId}
            setIsCropping={setIsCropping}
            setIsUploaderLoading={setIsUploaderLoading}
            setProductPickForm={setProductPickForm}
            sortIndex={index}
          />
        )
      )}
    </div>
  )
}

export default SortableContainer(ProductPicks)
