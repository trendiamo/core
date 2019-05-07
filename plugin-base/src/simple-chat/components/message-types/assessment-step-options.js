import React from 'react'
import styled from 'styled-components'
import Tile from './assessment-step-option'
import { imgixUrl } from 'tools'

const TilesWrapperDiv = styled.div`
  align-content: baseline;
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -5px;
`

const AssessmentStepOptions = ({ onClick, options, hideAll, nothingSelected }) => (
  <TilesWrapperDiv>
    {options.map(option => (
      <Tile
        hideAll={hideAll}
        highlight
        imageUrl={imgixUrl(option.picUrl, { fit: 'crop', w: 156, h: 120 })}
        key={`option-${option.title}`}
        nothingSelected={nothingSelected}
        onClick={() => onClick({ type: 'assessmentOption', item: option })}
        option={option}
        title={option.title}
      />
    ))}
  </TilesWrapperDiv>
)

export default AssessmentStepOptions
