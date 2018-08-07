import Dropzone from 'react-dropzone'
import { getSignedUrl } from './utils'
import React from 'react'
import S3Upload from 'react-s3-uploader/s3upload'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
import ReactCrop, { getPixelCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
`

const Progress = styled.progress`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  margin-right: 0.5rem;

  &[value]::-webkit-progress-bar {
    background-color: #efefef;
  }
  &[value]::-webkit-progress-value {
    background-color: #bbb;
    transition: all 250ms ease;
  }
`

const ProgressMessage = styled.span`
  font-size: small;
`

const Logo = ({
  crop,
  croppedImage,
  doneCropping,
  image,
  progress,
  onCropChange,
  onCropComplete,
  onDoneClick,
  onDrop,
  onImageLoaded,
  setImagePreviewRef,
  value,
}) => (
  <React.Fragment>
    <label>{'BRAND LOGO'}</label>
    <div className="o-layout" style={{ marginBottom: '12px' }}>
      <div className="o-layout__item u-1/4">
        <Dropzone
          accept="image/png"
          multiple={false}
          onDrop={onDrop}
          style={{ borderWidth: 0, cursor: 'pointer', height: '100px', width: '100px' }}
        >
          <img
            alt=""
            src={value ? value : croppedImage ? croppedImage : image ? image.preview : ''}
            style={{
              backgroundColor: '#e5e5e5',
              borderRadius: '50%',
              display: 'block',
              height: '100%',
              width: '100%',
            }}
          />
        </Dropzone>
      </div>
      <div className="o-layout__item u-3/4">
        {image &&
          !doneCropping && (
            <div style={{ display: 'flex', height: '100px' }}>
              <img ref={setImagePreviewRef} src={image.preview} style={{ display: 'none' }} />
              <ReactCrop
                crop={crop}
                keepSelection
                minHeight={20}
                minWidth={20}
                onChange={onCropChange}
                onComplete={onCropComplete}
                onImageLoaded={onImageLoaded}
                src={image.preview}
                style={{ border: '1px dashed #fff', marginRight: '1rem' }}
              />
              <div>
                <p>{'Please crop the image (or leave as default).'}</p>
                <button onClick={onDoneClick} type="button">
                  {'Done'}
                </button>
                {progress && (
                  <ProgressContainer>
                    <Progress max="100" value={progress.progress}>
                      {progress.progress}
                    </Progress>
                    <ProgressMessage>{`${progress.message}...`}</ProgressMessage>
                  </ProgressContainer>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  </React.Fragment>
)

const defaultCrop = image =>
  makeAspectCrop(
    {
      aspect: 1,
      width: 100,
      x: 0,
      y: 0,
    },
    image.width / image.height
  )

const previewCrop = (image, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return canvas.toDataURL('image/jpeg')
}

const resultingCrop = (image, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
}

const setPreviewCrop = ({ image, pixelCrop, setCroppedImage }) => setCroppedImage(previewCrop(image, pixelCrop))

export default compose(
  withState('crop', 'setCrop', {}),
  withState('image', 'setImage', null),
  withState('croppedImage', 'setCroppedImage', null),
  withState('doneCropping', 'setDoneCropping', false),
  withState('progress', 'setProgress', null),
  withHandlers(() => {
    let imagePreviewRef
    return {
      onCropChange: ({ setCrop }) => crop => setCrop(crop),
      onCropComplete: ({ setCrop, setCroppedImage }) => (_crop, pixelCrop) => {
        if (pixelCrop.height === 0 || pixelCrop.width === 0) {
          const crop = defaultCrop(imagePreviewRef)
          setCrop(crop)
          pixelCrop = getPixelCrop(imagePreviewRef, crop)
        }
        setPreviewCrop({ image: imagePreviewRef, pixelCrop, setCroppedImage })
      },
      onDoneClick: ({ crop, image, onChange, setDoneCropping, setProgress }) => async () => {
        const blob = await resultingCrop(imagePreviewRef, getPixelCrop(imagePreviewRef, crop))
        blob.name = image.name
        new S3Upload({
          contentDisposition: 'auto',
          files: [blob],
          getSignedUrl: getSignedUrl,
          onError: status => {
            console.error(status)
            alert('Error uploading file, please try again or contact us')
            location.reload()
          },
          onFinishS3Put: ({ fileUrl }) => {
            setTimeout(() => {
              onChange(fileUrl)
              setDoneCropping(true)
              setProgress(null)
            }, 250)
          },
          onProgress: (progress, message) => setProgress({ message, progress }),
          preprocess: (file, next) => next(file),
          uploadRequestHeaders: {}, // don't use x-amz-acl as that would have to be signed, and we don't need it
        })
      },
      onDrop: ({ onChange, setDoneCropping, setImage }) => files => {
        onChange('')
        setDoneCropping(false)
        setImage(files[0])
      },
      onImageLoaded: ({ setCrop, setCroppedImage }) => image => {
        const crop = defaultCrop(image)
        setCrop(crop)
        setPreviewCrop({ image: imagePreviewRef, pixelCrop: getPixelCrop(image, crop), setCroppedImage })
      },
      setImagePreviewRef: () => ref => {
        imagePreviewRef = ref
      },
    }
  })
)(Logo)
