import React from 'react'
import Spotlight from './spotlight'
import { compose, shouldUpdate, withProps } from 'recompose'
import { isEqual, omit } from 'lodash'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSpotlight = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange', 'setProductPicksPictures', 'setIsCropping', 'onFocus', 'spotlight']
    return (
      !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps)) || !isEqual(props.spotlight, nextProps.spotlight)
    )
  })
)(SortableElement(Spotlight))

const Spotlights = ({
  allowDelete,
  isFormLoading,
  isCropping,
  setIsCropping,
  form,
  personas,
  setProductPicksPictures,
  productPicksPictures,
  setSpotlightForm,
  onFocus,
}) => (
  <div>
    {form.spotlightsAttributes.map((spotlight, index) => (
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

const SpotlightsContainer = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onFocus', 'onSortEnd', 'form', 'setIsCropping', 'setProductPicksPictures', 'setSpotlightForm']
    return (
      !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps)) ||
      !isEqual(props.form.spotlightsAttributes, nextProps.form.spotlightsAttributes)
    )
  }),
  withProps(({ form }) => ({ allowDelete: form.spotlightsAttributes.length > 1 }))
)(SortableContainer(Spotlights))

export default SpotlightsContainer
