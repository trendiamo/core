import { h } from 'preact'
import jsonp from 'jsonp-p'
import qs from 'querystring'
import styled from 'styled-components'
import { width } from '../../config'
import { compose, lifecycle, withState } from 'recompose'

const StyledIframe = styled.iframe`
  margin-bottom: 1rem;
  width: 100%;
`

const IG_HEIGHT = 196 // height of the IG embed UI as they do it, except the image. (this is not controlled by us)

const IgPost = ({ url, height }) => height && <StyledIframe frameBorder="0" src={`${url}/embed`} style={{ height }} />

export default compose(
  withState('height', 'setHeight', 0),
  lifecycle({
    componentDidMount() {
      const { url, setHeight } = this.props
      const queryParams = qs.stringify({
        omitscript: true,
        url,
      })
      jsonp(`https://api.instagram.com/oembed/?${queryParams}`).promise.then(response => {
        const aspectRatio = response.thumbnail_width / response.thumbnail_height
        const imgHeight = Math.round((width - 16 * 2) / aspectRatio)
        setHeight(IG_HEIGHT + imgHeight)
      })
    },
  })
)(IgPost)
