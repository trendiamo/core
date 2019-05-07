import ImagesModal from './images-modal'
import VideoModal from 'shared/video-modal'
import { h } from 'preact'

const ChatModals = ({
  videoModalOpen,
  videoItem,
  closeVideoModal,
  imageModalOpen,
  imagesModalIndex,
  setImageModalOpen,
  imagesModalUrls,
  imagesModalTouch,
}) => (
  <div>
    <VideoModal closeModal={closeVideoModal} isOpen={videoModalOpen} url={videoItem && videoItem.youtubeEmbedUrl} />
    <ImagesModal
      index={imagesModalIndex}
      isOpen={imageModalOpen}
      isTouch={imagesModalTouch}
      setIsOpen={setImageModalOpen}
      urlsArray={imagesModalUrls}
    />
  </div>
)

export default ChatModals
