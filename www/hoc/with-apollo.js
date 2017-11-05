// @flow

import isNode from 'detect-node'
import Head from 'next/head'
import React from 'react'
import {ApolloProvider, getDataFromTree} from 'react-apollo'

import createApolloClient from '../lib/apollo-client'

export default (ComposedComponent: any) => {
  type Props = {
    apollo: any,
    composedProps: Object,
    host: string,
    query: Object
  }

  const WithApollo = ({apollo, host, query, composedProps}: Props) => (
    <ApolloProvider client={createApolloClient(apollo, {host})}>
      <ComposedComponent
        query={query}
        {...composedProps}
      />
    </ApolloProvider>
  )

  WithApollo.getInitialProps = async ctx => {
    const host = ctx.req ? ctx.req.headers['host'] : window.location.hostname
    const composedInitialProps = ComposedComponent.getInitialProps
      ? await ComposedComponent.getInitialProps(ctx)
      : {}
    const apolloProps = {}

    if (isNode) {
      const apolloClient = createApolloClient(null, {host})

      try {
        await getDataFromTree(
          <ApolloProvider client={apolloClient}>
            <ComposedComponent
              {...composedInitialProps}
              query={ctx.query}
            />
          </ApolloProvider>
        )
      } catch (err) {
        console.error(err)
      }

      Head.rewind()

      apolloProps.apollo = {
        data: apolloClient.getInitialState().data
      }
    }

    return {
      composedProps: composedInitialProps,
      apollo: apolloProps,
      query: ctx.query,
      host
    }
  }

  return WithApollo
}
