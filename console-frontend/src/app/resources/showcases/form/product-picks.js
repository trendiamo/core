import ProductPick from './product-pick'
import React, { useCallback, useMemo } from 'react'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableProductPick = SortableElement(ProductPick)

const ProductPicks = ({
  isFormLoading,
  isCropping,
  setIsCropping,
  spotlight,
  onChange,
  setProductPicture,
  onFocus,
}) => {
  const allowDelete = useMemo(
    () => spotlight.productPicksAttributes.filter(productPick => !productPick._destroy).length > 1,
    [spotlight.productPicksAttributes]
  )

  const handleFocus = useCallback(
    () => {
      onFocus(spotlight)
    },
    [onFocus, spotlight]
  )

  return (
    <div>
      {spotlight.productPicksAttributes.map((productPick, index) =>
        productPick._destroy ? null : (
          <SortableProductPick
            allowDelete={allowDelete}
            folded={productPick.id}
            index={index}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            key={productPick.id || productPick.__key}
            onChange={onChange}
            onFocus={handleFocus}
            personaId={spotlight.personaId}
            productPick={productPick}
            setIsCropping={setIsCropping}
            setProductPicture={setProductPicture}
            sortIndex={index}
          />
        )
      )}
    </div>
  )
}

export default SortableContainer(ProductPicks)
