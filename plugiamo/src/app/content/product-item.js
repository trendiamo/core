import { h } from 'preact'
import mixpanel from 'ext/mixpanel'
import { compose, withHandlers } from 'recompose'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'

const ProductItem = ({ product, onListItemClick }) => (
  <ListItem onClick={onListItemClick}>
    <ListImg src={product.picture.url} />
    <ListContent>
      <div style={{ color: '#4a4a4a', display: 'flex', flexDirection: 'column' }}>
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
    onListItemClick: ({ product }) => () => {
      mixpanel.track('Clicked Product', { hostname: location.hostname }, () => {
        window.location = product.url
      })
    },
  })
)(ProductItem)
