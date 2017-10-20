// @flow

import isNode from 'detect-node'
import Head from 'next/head'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {ApolloProvider, getDataFromTree} from 'react-apollo'

import createApolloClient from '../lib/apollo-client'

export default (ComposedComponent: any) => (
  class GraphQL extends Component<any> {
    static childContextTypes = {
      postBody: PropTypes.object
    }

    static getInitialProps = async ctx => {
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
        postBody: ctx.req && ctx.req.body,
        query: ctx.query,
        host
      }
    }

    getChildContext = () => ({
      postBody: this.props.postBody
    })

    render = () => (
      <ApolloProvider
        client={createApolloClient(this.props.apollo, {host: this.props.host})
      }>
        <ComposedComponent
          query={this.props.query}
          {...this.props.composedProps}
        />
      </ApolloProvider>
    )
  }
)
