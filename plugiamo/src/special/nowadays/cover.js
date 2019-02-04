import styled from 'styled-components'
import { h } from 'preact'

const CoverBase = styled.div`
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 70px;
  min-height: 70px;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;

  @media (min-height: 500px) {
    position: fixed;
  }
`

export const BelowCover = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;

  @media (min-height: 500px) {
    overflow-y: auto;
    margin-top: 70px;
  }
`

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 3px 0;
`

const PresentedBy = styled.div`
  font-size: 15px;
  font-weight: normal;
  margin: 0;
`

export const Cover = ({ persona, product }) => (
  <CoverBase>
    <H1>{product.name}</H1>
    <PresentedBy>
      {'presented by '}
      <b>{persona.instagramHandle}</b>
    </PresentedBy>
  </CoverBase>
)

// <CoverImg src={persona.profilePic.url} />
