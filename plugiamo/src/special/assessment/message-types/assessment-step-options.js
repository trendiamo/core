import AssessmentStepOption from './assessment-step-option'
import styled from 'styled-components'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'
import { useCallback } from 'preact/hooks'

const TilesWrapperDiv = styled.div`
  align-content: baseline;
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -5px;
`

const Element = ({ hideAll, nothingSelected, onClick, option }) => {
  const newOnClick = useCallback(() => onClick({ type: 'assessmentOption', item: option }), [onClick, option])

  return (
    <AssessmentStepOption
      hideAll={hideAll}
      highlight
      imageUrl={imgixUrl(option.picUrl, { fit: 'crop', w: 165, h: 120 })}
      nothingSelected={nothingSelected}
      onClick={newOnClick}
      option={option}
      title={option.title}
    />
  )
}

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
