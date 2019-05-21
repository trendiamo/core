import React from 'react'
import styled from 'styled-components'
import Tile from './assessment-step-option'
import { compose, withHandlers } from 'recompose'
import { imgixUrl } from 'tools'

const TilesWrapperDiv = styled.div`
  align-content: baseline;
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -5px;
`

const AssessmentStepOption = compose(
  withHandlers({
    onClick: ({ onClick, option }) => () => onClick({ type: 'assessmentOption', item: option }),
  })
)(({ hideAll, nothingSelected, onClick, option }) => (
  <Tile
    hideAll={hideAll}
    highlight
    imageUrl={imgixUrl(option.picUrl, { fit: 'crop', w: 156, h: 120 })}
    nothingSelected={nothingSelected}
    onClick={onClick}
    option={option}
    title={option.title}
  />
))

const AssessmentStepOptions = ({ onClick, options, hideAll, nothingSelected }) => (
  <TilesWrapperDiv>
    {options.map(option => (
      <AssessmentStepOption
        hideAll={hideAll}
        key={`option-${option.title}`}
        nothingSelected={nothingSelected}
        onClick={onClick}
        option={option}
      />
    ))}
  </TilesWrapperDiv>
)

export default AssessmentStepOptions
