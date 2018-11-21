import styled from 'styled-components'

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

export const BelowCover = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-height: 500px) {
    margin-top: 100px;
  }
`

export default Cover
