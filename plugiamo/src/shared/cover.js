import styled from 'styled-components'
import { animate } from 'shared/animate'

const CoverImg = styled.img`
  border-radius: 50%;
  height: 45px;
  width: 45px;
  object-fit: cover;
`

const PaddedCover = styled.div`
  padding-left: 10px;
`

const PersonaDescription = animate(
  styled.div`
    color: #ddd;
    font-size: 12px;
  `,
  250 * 2
)

export { CoverImg, PersonaDescription, PaddedCover }
