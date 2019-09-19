import auth from 'auth'
import blankStateImage from 'assets/img/background/img-empty-01.png'
import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, Avatar, EnhancedList, Logo, TableCell, Text } from 'shared/table-elements'
import {
  apiSimpleChatDestroy,
  apiSimpleChatDuplicate,
  apiSimpleChatList,
  apiSimpleChatReject,
  apiSimpleChatShow,
  defaultSorting,
} from 'utils'
import { sellerImgUrl } from 'plugin-base'

const columns = [
  { name: 'id', label: 'id', sortable: true },
  auth.isSeller()
    ? { name: 'brand', padding: 'none', label: 'brand', sortable: true }
    : { name: 'seller', padding: 'none', label: 'seller' },
  { name: 'name', sortable: true, label: 'name' },
  { name: 'active', label: auth.isSeller() ? 'status' : 'active', sortable: true },
]

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description={"You don't have any simple chats yet. Let's create the first one?"}
    imageSource={blankStateImage}
    route={routes.simpleChatCreate()}
    title="Create a new simple chat"
  />
)

const SimpleChatsRow = ({ highlightInactive, isSubmittedResource, record }) => (
  <>
    <TableCell width="20%">
      {auth.isSeller() ? (
        <Logo alt="" disabled={highlightInactive} src={record.brand.logoUrl} />
      ) : (
        <Avatar alt="" disabled={highlightInactive} src={sellerImgUrl(record.seller, record.useSellerAnimation)} />
      )}
    </TableCell>
    <TableCell width="80%">
      <Text disabled={highlightInactive}>{record.name}</Text>
    </TableCell>
    <ActiveColumn
      highlightInactive={highlightInactive}
      highlightSubmitted={auth.isSeller() && isSubmittedResource(record)}
      symbolTextActive="Active"
      symbolTextInactive="Draft"
      symbolTextSubmitted="Submitted"
      tooltipTextActive={auth.isSeller() ? 'Currently used by the brand' : 'Already used in Triggers'}
      tooltipTextInactive={auth.isSeller() ? 'Not yet submitted to the brand' : 'Not yet used in Triggers'}
      tooltipTextSubmitted="Submitted to the brand"
    />
  </>
)

const api = {
  duplicate: apiSimpleChatDuplicate,
  destroy: apiSimpleChatDestroy,
  fetch: apiSimpleChatList,
  reject: apiSimpleChatReject,
  show: apiSimpleChatShow,
}
const simpleChatsRoutes = { create: routes.simpleChatCreate, edit: routes.simpleChatEdit, show: routes.simpleChatShow }
const highlightInactive = ['triggerIds']

const isSubmittedResource = resource =>
  ((resource.seller && !resource.seller.id) || (resource.__seller && !resource.__seller.id)) && !!resource.accountId

const canEditResource = resource =>
  !isSubmittedResource(resource) &&
  (auth.isAdmin() ||
    auth.getAccountRole() === 'owner' ||
    (resource.triggerIds.length < 1 && resource.ownerId === auth.getUser().id))

const canRejectResource = resource =>
  isSubmittedResource(resource) &&
  (auth.isAdmin() || auth.getAccountRole() === 'owner') &&
  resource.triggerIds.length < 1

const SimpleChatsList = () => (
  <EnhancedList
    api={api}
    BlankState={BlankState}
    buttonText="Create new"
    canEditResource={canEditResource}
    canRejectResource={canRejectResource}
    columns={columns}
    defaultSorting={defaultSorting}
    helpStep="simpleChats"
    highlightInactive={highlightInactive}
    isSubmittedResource={isSubmittedResource}
    ResourceRow={SimpleChatsRow}
    routes={simpleChatsRoutes}
    title="Simple Chats"
  />
)

export { canRejectResource }
export default SimpleChatsList
