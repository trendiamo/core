import ImagesModal from './images-modal'
import PictureModal from './picture-modal'
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
  pictureModalOpen,
  pictureItem,
  closePictureModal,
}) => (
  <div>
    <VideoModal closeModal={closeVideoModal} isOpen={videoModalOpen} url={videoItem && videoItem.youtubeEmbedUrl} />
    <ImagesModal
      flowType={flowType}
      index={imagesModalIndex}
      isOpen={imagesModalOpen}
      isTouch={imagesModalTouch}
      pictureItem={pictureItem}
      setIsOpen={setImagesModalOpen}
      urlsArray={imagesModalUrls}
    />
    <PictureModal closeModal={closePictureModal} isOpen={pictureModalOpen} pictureItem={pictureItem} />
  </div>
)

export default ChatModals
