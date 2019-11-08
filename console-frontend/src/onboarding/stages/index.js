import auth from 'auth'
import initial from './initial'
import sellerCreated from './seller-created'
import uptous from './uptous'

export const stages = auth.isAffiliate() ? { uptous } : { initial, sellerCreated }

export const stagesArray = auth.isAffiliate() ? [uptous] : [initial, sellerCreated]
