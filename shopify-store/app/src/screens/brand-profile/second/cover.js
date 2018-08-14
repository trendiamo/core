import Dropzone from 'react-dropzone'
import { getSignedUrl } from 'app/utils'
import querystring from 'querystring'
import React from 'react'
import S3Upload from 'react-s3-uploader/s3upload'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
import { Progress, ProgressContainer, ProgressMessage } from 'shared/progress'

const Container = styled.div`
  background-color: #ddd;
  background-image: ${({ background }) => (background ? `url('${background}')` : `'none'`)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 420px;
  max-height: 75vh;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Fields = styled.div`
  max-width: 300px;
  background: #fff;
  padding: 1rem;
  box-shadow: 0px 0px 2px #222;
  z-index: 1;
`

const ProgressParent = styled.div`
  position: absolute;
  bottom: 20px;
`

const Cover = ({
  background,
  onChangeType,
  onDrop,
  onVideoUrlChange,
  onUpload,
  progress,
  setDropzoneRef,
  type,
  videoUrl,
}) => (
  <Container background={background}>
    <Dropzone
      accept="image/*"
      disableClick
      disabled={type !== 'image'}
      multiple={false}
      onDrop={onDrop}
      ref={setDropzoneRef}
      style={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }}
    />
    <Fields>
      <div className="selector-wrapper">
        <select onChange={onChangeType} style={{ margin: 0, paddingLeft: '1rem' }} value={type}>
          <option value="">{'Please select type of header'}</option>
          <option value="image">{'Image'}</option>
          <option value="video">{'Video'}</option>
        </select>
      </div>
      {type === 'image' && (
        <React.Fragment>
          <label>{'Drop an image, or upload one below:'}</label>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="c-btn c-btn--primary" onClick={onUpload} type="button">
              {'Upload'}
            </button>
          </div>
        </React.Fragment>
      )}
      {type === 'video' && (
        <React.Fragment>
          <label htmlFor="headerContentVideo">{'Please paste in a Youtube video url'}</label>
          <input
            autoCapitalize="off"
            autoCorrect="off"
            id="headerContentVideo"
            name="headerContentVideo"
            onChange={onVideoUrlChange}
            placeholder="header video url"
            required
            spellCheck="false"
            type="text"
            value={videoUrl}
          />
        </React.Fragment>
      )}
    </Fields>
    {progress && (
      <ProgressParent>
        <ProgressContainer>
          <Progress max="100" value={progress.progress}>
            {progress.progress}
          </Progress>
          <ProgressMessage>{`${progress.message}...`}</ProgressMessage>
        </ProgressContainer>
      </ProgressParent>
    )}
  </Container>
)

export default compose(
  withState(
    'type',
    'setType',
    ({ brand }) => (brand.headerContentPhoto ? 'image' : brand.headerContentVideo ? 'video' : '')
  ),
  withState('videoUrl', 'setVideoUrl', ({ brand }) => brand.headerContentVideo || ''),
  withHandlers({
    extractPreview: () => videoUrl => {
      if (!videoUrl) return null
      const videoId = (querystring.parse(videoUrl.replace(/.*\?/, '')) || {}).v
      if (!videoId || videoId.length !== 11) return null
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    },
  }),
  withState(
    'background',
    'setBackground',
    ({ brand, extractPreview }) => brand.headerContentPhoto || extractPreview(brand.headerContentVideo)
  ),
  withState('progress', 'setProgress', null),
  withHandlers(() => {
    let dropzoneRef
    return {
      onChangeType: ({ setBackground, setType }) => event => {
        setBackground(null)
        setType(event.target.value)
      },
      onDrop: ({ onPictureUrlChange, setBackground, setProgress }) => files => {
        setBackground(null)
        new S3Upload({
          contentDisposition: 'auto',
          files,
          getSignedUrl,
          onError: status => {
            console.error(status)
            alert('Error uploading file, please try again or contact us')
            location.reload()
          },
          onFinishS3Put: ({ fileUrl }) => {
            setTimeout(() => {
              onPictureUrlChange(fileUrl)
              setProgress(null)
              setBackground(fileUrl)
            }, 250)
          },
          onProgress: (progress, message) => setProgress({ message, progress }),
          preprocess: (file, next) => next(file),
          uploadRequestHeaders: {}, // don't use x-amz-acl as that would have to be signed, and we don't need it
        })
      },
      onUpload: () => () => dropzoneRef.open(),
      onVideoUrlChange: ({ extractPreview, onVideoUrlChange, setBackground, setVideoUrl }) => event => {
        const value = event.target.value
        setBackground(extractPreview(value))
        setVideoUrl(value)
        onVideoUrlChange(value)
      },
      setDropzoneRef: () => ref => {
        dropzoneRef = ref
      },
    }
  })
)(Cover)
