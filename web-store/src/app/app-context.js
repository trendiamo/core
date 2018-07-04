import omit from 'lodash.omit'
import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'

const AppContext = React.createContext()

const initialState = {
  products: {}, // hash of productSlug to product
  taxons: {}, // hash of taxonSlug to taxon
}

const ContextProvider = compose(
  withState('store', 'setStore', initialState),
  withHandlers({
    setProducts: ({ setStore, store }) => products => setStore({ ...store, products }),
    setTaxons: ({ setStore, store }) => taxons => setStore({ ...store, taxons }),
  }),
  withProps(props => ({ context: omit(props, 'children') }))
)(({ context, children }) => <AppContext.Provider value={context}>{children}</AppContext.Provider>)

export default { Consumer: AppContext.Consumer, Provider: ContextProvider }
