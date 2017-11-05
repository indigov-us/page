// @flow

import isNode from 'detect-node'
import {ApolloClient, createNetworkInterface} from 'react-apollo'

let client

const createClient = (initialState?: ?Object, {host}: {host: string}) => {
  const networkInterface = createNetworkInterface({
    ssrMode: isNode,
    uri: isNode ? 'http://cms/graphql' : `${window.location.protocol}//${window.location.hostname}/graphql`
  })

  networkInterface.use([{
    applyMiddleware (req, next) {
      if (isNode) req.options.headers = {host}
      next()
    }
  }])

  return new ApolloClient({
    initialState,
    ssrMode: isNode,
    networkInterface
  })
}

export default (initialState?: ?Object, {host}: {host: string}) => {
  if (isNode) return createClient(initialState, {host})
  if (!client) client = createClient(initialState, {host})
  return client
}
