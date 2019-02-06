import LeftArrowIcon from 'icons/left-arrow.svg'
import RightArrowIcon from 'icons/right-arrow.svg'
import { h } from 'preact'

const CarouselModalArrows = ({ selectedImageIndex, onLeftArrowClick, onRightArrowClick, urlsArray }) => (
  <h.Fragment>
    <button
      onClick={onLeftArrowClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '50%',
        zIndex: '1234000000',
        border: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        outline: 0,
        cursor: 0 < selectedImageIndex ? 'pointer' : 'default',
      }}
      type="button"
    >
      <LeftArrowIcon
        style={{
          display: 0 < selectedImageIndex ? 'block' : 'none',
          fill: '#fff',
          width: '42px',
          height: '42px',
          position: 'absolute',
          left: '40px',
          top: '50vh',
          zIndex: '12340000004',
          cursor: 'pointer',
        }}
      />
    </button>
    <button
      onClick={onRightArrowClick}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100vh',
        width: '50%',
        border: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        outline: 0,
        zIndex: '1234000000',
        cursor: 0 < selectedImageIndex < urlsArray.length - 1 ? 'pointer' : 'default',
      }}
      type="button"
    >
      <RightArrowIcon
        style={{
          display: 0 < selectedImageIndex < urlsArray.length - 1 ? 'block' : 'none',
          fill: '#fff',
          width: '42px',
          height: '42px',
          position: 'absolute',
          right: '40px',
          top: '50vh',
          zIndex: '12340000004',
          cursor: 'pointer',
        }}
      />
    </button>
  </h.Fragment>
)

export default CarouselModalArrows
