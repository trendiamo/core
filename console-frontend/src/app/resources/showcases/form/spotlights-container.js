import React, { memo } from 'react'
import Spotlight from './spotlight'
import { isEqual, omit } from 'lodash'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSpotlight = memo(SortableElement(Spotlight), (props, nextProps) => {
  const ignoreProps = ['onChange', 'setProductPicksPictures', 'setIsCropping', 'onFocus']
  return isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
})

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
      {form.spotlightsAttributes
        .filter(spotlight => !spotlight._destroy)
        .map((spotlight, index) => (
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
        ))}
    </div>
  )
}

const SpotlightsContainer = memo(SortableContainer(Spotlights), (props, nextProps) => {
  const ignoreProps = ['onFocus', 'onSortEnd', 'form', 'setIsCropping', 'setProductPicksPictures', 'setSpotlightForm']
  return (
    isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps)) &&
    isEqual(props.form.spotlightsAttributes, nextProps.form.spotlightsAttributes)
  )
})

export default SpotlightsContainer
