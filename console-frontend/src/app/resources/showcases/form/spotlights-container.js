import React, { useMemo } from 'react'
import Spotlight from './spotlight'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSpotlight = SortableElement(Spotlight)

const Spotlights = ({
  isFormLoading,
  isCropping,
  setIsCropping,
  form,
  personas,
  setProductPicksPictures,
  productPicksPictures,
  setSpotlightForm,
  onSpotlightClickFactory,
}) => {
  const allowDelete = useMemo(() => form.spotlightsAttributes.filter(spotlight => !spotlight._destroy).length > 1, [
    form.spotlightsAttributes,
  ])

  return (
    <div>
      {form.spotlightsAttributes.map((spotlight, index) =>
        spotlight._destroy ? null : (
          <SortableSpotlight
            allowDelete={allowDelete}
            folded={spotlight.id}
            index={index}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            key={spotlight.id || spotlight.__key}
            onChange={setSpotlightForm}
            onFocus={onSpotlightClickFactory({ ...spotlight, id: spotlight.id || `new-${index}` })}
            personas={personas}
            productPicksPictures={productPicksPictures}
            setIsCropping={setIsCropping}
            setProductPicksPictures={setProductPicksPictures}
            sortIndex={index}
            spotlight={spotlight}
          />
        )
      )}
    </div>
  )
}

const SpotlightsContainer = SortableContainer(Spotlights)

export default SpotlightsContainer
