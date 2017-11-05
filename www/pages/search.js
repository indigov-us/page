// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import Grid from '../components/grid'
import Page from '../components/page'
import linkTo from '../lib/link-to'

type Props = {
  data: {
    posts?: {
      edges: Array<{
        node: {
          author: {
            name: string
          },
          content: string,
          excerpt: string,
          featuredImage?: {
            altText: string,
            sourceUrl: string
          },
          id: string,
          postId: string,
          slug: string,
          title: string
        }
      }>
    }
  },
  query: {
    q: string
  }
}

const SearchPage = ({data: {posts}, query: {q}}: Props) => {
  return (
    <Page
      title='Search'
    >
      <div className='container'>
        <Grid
          items={posts && posts.edges}
          itemRoute={({postId, slug}) => linkTo('article', {idSlug: `${postId}-${slug}`})}
          title={`${(posts && posts.edges.length) || 0} results for "${q}"`}
        />
      </div>
    </Page>
  )
}

SearchPage.displayName = 'SearchPage'

export default WithCustomized(WithApollo(graphql(gql(`
  query ($q: String) {
    posts (
      where: {search: $q}
    ) {
      edges {
        node {
          author {
            name
          }
          content
          excerpt
          featuredImage {
            altText
            sourceUrl
          }
          id
          postId
          slug
          title
        }
      }
    }
  }
`), {
  options: ({query: {q}}: {query: {q: string}}) => ({variables: {q}})
})(SearchPage)))
