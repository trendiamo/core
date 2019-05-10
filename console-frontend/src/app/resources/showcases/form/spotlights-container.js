import React from 'react'
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
  onFocus,
}) => {
  const allowDelete = form.spotlightsAttributes.length > 1

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
            key={spotlight.id || `new-${index}`}
            onChange={setSpotlightForm}
            onFocus={onFocus({ spotlight: { ...spotlight, id: spotlight.id || `new-${index}` } })}
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
