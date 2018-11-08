import S3UploadLib from 'react-s3-uploader/s3upload'

const S3Upload = args => {
  return new Promise((resolve, reject) => {
    new S3UploadLib({ ...args, onFinishS3Put: resolve, onError: reject })
  })
}

export default S3Upload
