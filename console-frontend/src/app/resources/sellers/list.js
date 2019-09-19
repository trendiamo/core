import Avatar from 'shared/table-elements/avatar'
import blankStateImage from 'assets/img/background/img-empty-02.png'
import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { apiSellerDestroy, apiSellerList } from 'utils'
import { EnhancedList, TableCell } from 'shared/table-elements'
import { imgixUrl, stringifyRect } from 'plugin-base'

const columns = [
  { name: 'id', label: 'id', sortable: true },
  { name: 'avatar' },
  { name: 'name', label: 'name', sortable: true },
  { name: 'bio', label: 'bio' },
]

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description={"You don't have any sellers yet. Let's create the first one?"}
    imageSource={blankStateImage}
    route={routes.sellerCreate()}
    title="Create a new seller"
  />
)

const SellersRow = ({ record }) => (
  <>
    <TableCell>
      <Avatar
        alt={record.name}
        src={imgixUrl(record.img.url, { rect: stringifyRect(record.imgRect) })}
        style={{ marginRight: '0.5rem' }}
      />
    </TableCell>
    <TableCell width="30%">{record.name}</TableCell>
    <TableCell width="70%">{record.bio}</TableCell>
  </>
)

const api = { fetch: apiSellerList, destroy: apiSellerDestroy }
const sellersRoutes = { create: routes.sellerCreate, edit: routes.sellerEdit }

const SellersList = () => (
  <EnhancedList
    api={api}
    BlankState={BlankState}
    buttonText="Create new"
    columns={columns}
    helpStep="sellers"
    ResourceRow={SellersRow}
    routes={sellersRoutes}
    title="Sellers"
  />
)

export default SellersList
