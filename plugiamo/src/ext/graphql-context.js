import { createContext } from 'preact'

const GraphqlContext = createContext('graphql')

export const Consumer = GraphqlContext.Consumer
export const Provider = GraphqlContext.Provider
