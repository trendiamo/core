import styled from 'styled-components'

const defaultHeaderConfig = {
  heights: { min: 90, max: 140 },
}

const Cover = styled.div`
  background-color: ${({ hackathon, backgroundColor = '#fff' }) => (hackathon ? backgroundColor : '#232323')};
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: ${({ headerConfig = defaultHeaderConfig }) => headerConfig.heights.max};
  max-height: ${({ minimized, headerConfig = defaultHeaderConfig }) =>
    minimized ? headerConfig.heights.min : headerConfig.heights.max}px;
  ${({ hackathon }) =>
    !hackathon &&
    `
  height: 100px;
  max-height: 100px;
`}
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  transition: max-height 0.4s ease-in-out, background-color 0.4s ease-in-out;
  box-shadow: 0px 5px 10px rgba(25, 39, 54, 0.13);
  flex-shrink: 0;
`

export default Cover
