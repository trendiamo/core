import ImageModal from './image-modal'
import ImagesModal from './images-modal'
import VideoModal from './video-modal'
import { h } from 'preact'

const ChatModals = ({
  videoModalOpen,
  videoItem,
  closeVideoModal,
  imagesModalOpen,
  imagesModalIndex,
  setImagesModalOpen,
  imagesModalUrls,
  imagesModalTouch,
  flowType,
  imageModalOpen,
  imageItem,
  closeImageModal,
}) => (
  <div>
    <VideoModal closeModal={closeVideoModal} isOpen={videoModalOpen} url={videoItem && videoItem.youtubeEmbedUrl} />
    <ImagesModal
      flowType={flowType}
      imageItem={imageItem}
      index={imagesModalIndex}
      isOpen={imagesModalOpen}
      isTouch={imagesModalTouch}
      setIsOpen={setImagesModalOpen}
      urlsArray={imagesModalUrls}
    />
    <ImageModal closeModal={closeImageModal} imageItem={imageItem} isOpen={imageModalOpen} />
  </div>
)

export default ChatModals
