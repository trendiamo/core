import styled from 'styled-components'
import { imgixUrl, stringifyRect } from 'tools'

const SellerPic = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: ${({ sellerPic, launcherConfig }) =>
    sellerPic && sellerPic.url
      ? launcherConfig
        ? `url('${imgixUrl(sellerPic.url, {
            rect: stringifyRect(sellerPic.picRect),
            fit: 'crop',
            w: launcherConfig.size,
            h: launcherConfig.size,
          })}')`
        : `url('${imgixUrl(sellerPic.url, { rect: stringifyRect(sellerPic.picRect) })}')`
      : 'none'};
  transform: ${({ active }) => (active ? 'none' : 'rotate(30deg) scale(0)')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.25s ease, transform 0.25s ease;
  -webkit-perspective: 1000;
  backface-visibility: hidden;
`
export default SellerPic
