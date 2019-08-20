import React, { memo, useMemo } from 'react'
import Spotlight from './spotlight'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSpotlight = SortableElement(Spotlight)

const Spotlights = ({
  isCropping,
  isFormLoading,
  isUploaderLoading,
  onSortEnd,
  onSpotlightClick,
  sellers,
  setIsCropping,
  setIsUploaderLoading,
  setSpotlightForm,
  spotlightsAttributes,
}) => {
  const allowDelete = useMemo(() => spotlightsAttributes.filter(spotlight => !spotlight._destroy).length > 1, [
    spotlightsAttributes,
  ])

  return (
    <SortableContainer onSortEnd={onSortEnd}>
      {spotlightsAttributes.map((spotlight, index) =>
        spotlight._destroy ? null : (
          <SortableSpotlight
            allowDelete={allowDelete}
            folded={spotlight.id}
            index={index}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            isUploaderLoading={isUploaderLoading}
            key={spotlight.id || spotlight.__key}
            onSpotlightClick={onSpotlightClick}
            sellers={sellers}
            setIsCropping={setIsCropping}
            setIsUploaderLoading={setIsUploaderLoading}
            setSpotlightForm={setSpotlightForm}
            sortIndex={index}
            spotlight={spotlight}
          />
        )
      )}
    </SortableContainer>
  )
}

export default memo(Spotlights)
