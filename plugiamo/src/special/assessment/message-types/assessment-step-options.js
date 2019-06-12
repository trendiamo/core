import AssessmentStepOption from './assessment-step-option'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'

const TilesWrapperDiv = styled.div`
  align-content: baseline;
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -5px;
`

const Element = compose(
  withHandlers({
    onClick: ({ onClick, option }) => () => onClick({ type: 'assessmentOption', item: option }),
  })
)(({ hideAll, nothingSelected, onClick, option }) => (
  <AssessmentStepOption
    hideAll={hideAll}
    highlight
    imageUrl={imgixUrl(option.picUrl, { fit: 'crop', w: 165, h: 120 })}
    nothingSelected={nothingSelected}
    onClick={onClick}
    option={option}
    title={option.title}
  />
))

const AssessmentStepOptions = ({ onClick, options, hideAll, nothingSelected }) => (
  <TilesWrapperDiv>
    {options.map(option => (
      <Element
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
