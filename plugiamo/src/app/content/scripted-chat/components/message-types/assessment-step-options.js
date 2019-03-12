import styled from 'styled-components'
import Tile from './assessment-step-option'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'

const TilesWrapperDiv = styled.div`
  align-content: baseline;
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
`

const AssessmentStepOptions = ({ onClick, options, hideAll }) => (
  <TilesWrapperDiv>
    {options.map(option => (
      <Tile
        hideAll={hideAll}
        highlight
        imageUrl={imgixUrl(option.picUrl, { fit: 'crop', w: 156, h: 120 })}
        key={`option-${option.title}`}
        onClick={() => onClick(option)}
        title={option.title}
      />
    ))}
  </TilesWrapperDiv>
)

export default AssessmentStepOptions
