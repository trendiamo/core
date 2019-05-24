import ProductPick from './product-pick'
import React, { useMemo } from 'react'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableProductPick = SortableElement(ProductPick)

const ProductPicks = ({
  isFormLoading,
  isCropping,
  setIsCropping,
  productPicksAttributes,
  setProductPickForm,
  setProductPicture,
  onFocus,
  personaId,
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
            key={productPick.id || productPick.__key}
            onFocus={onFocus}
            personaId={personaId}
            productPick={productPick}
            setIsCropping={setIsCropping}
            setProductPickForm={setProductPickForm}
            setProductPicture={setProductPicture}
            sortIndex={index}
          />
        )
      )}
    </div>
  )
}

export default SortableContainer(ProductPicks)
