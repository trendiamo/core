import mixpanel from 'ext/mixpanel'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { location } from 'config'

const ProductItem = ({ product, onListItemClick }) => (
  <ListItem onClick={onListItemClick}>
    <ListImg src={product.picture.url} />
    <ListContent>
      <div style={{ color: '#4a4a4a', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '16px', fontWeight: '500', lineHeight: '1.4' }}>{product.name}</div>
        <div style={{ flex: 1, fontSize: '12px' }}>{product.description}</div>
        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{product.displayPrice}</div>
      </div>
    </ListContent>
    <ListChevron />
  </ListItem>
)

export default compose(
  withHandlers({
    onListItemClick: ({ product, spotlight }) => () => {
      mixpanel.track(
        'Clicked Product',
        {
          flowType: 'curation',
          personaName: spotlight.persona.name,
          personaRef: spotlight.persona.id,
          hostname: location.hostname,
          productName: product.name,
        },
        () => {
          window.location = product.url
        }
      )
    },
  })
)(ProductItem)
