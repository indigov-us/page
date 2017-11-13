// @flow

import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
import {HttpLink} from 'apollo-link-http'
import isNode from 'detect-node'

let client

const getURI = () => isNode ? 'http://cms/graphql' : `${window.location.protocol}//${window.location.hostname}/graphql`

const createClient = (initialState?: ?Object, {host}: {host: string}) => {
  const httpLink = new HttpLink({uri: getURI()})
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({headers: {host}})
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)

  return new ApolloClient({
    // connectToDevTools: !isNode,
    link,
    cache: new InMemoryCache().restore(initialState || {}),
    ssrMode: isNode
  })
}

export default (initialState?: ?Object, {host}: {host: string}) => {
  if (isNode) return createClient(initialState, {host})
  if (!client) client = createClient(initialState, {host})
  return client
}
