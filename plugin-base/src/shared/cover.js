import styled from 'styled-components'
import { animate } from './animate'

const Cover = styled.div`
  background-color: #232323;
  color: #fff;
  padding: 35px 20px 20px 20px;
  height: 100px;
  min-height: 100px;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;

  @media (min-height: 500px) {
    position: fixed;
  }
`

const BelowCover = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-height: 500px) {
    margin-top: 100px;
  }
`

const CoverImg = styled.img`
  border-radius: 50%;
  height: 45px;
  min-height: 45px;
  width: 45px;
  min-width: 45px;
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

export { BelowCover, CoverImg, PersonaDescription, PaddedCover }

export default Cover
