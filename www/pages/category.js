// @flow

import {Link} from 'next-url-prettifier'
import React from 'react'
import {gql, graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import WithSidebar from '../hoc/with-sidebar'
import Grid from '../components/grid'
import Page from '../components/page'
import linkTo from '../lib/link-to'

type Props = {
  data: {
    categories?: {
      edges: Array<{
        node: {
          id: string,
          link: string,
          name: string
        }
      }>
    },
    posts?: {
      edges: Array<{
        node: {
          excerpt: string,
          id: string,
          link: string,
          title: string
        }
      }>
    }
  }
}

const CategoryPage = ({data: {categories, posts}}: Props) => {
  const node = categories && categories.edges[0].node

  return (
    <Page
      title={node && node.name}
    >
      {node && (
        <WithSidebar>
          <h1 className='mb2 f-title'>
            <Link route={linkTo(node.link)}>
              <a
                className='black no-underline'
                dangerouslySetInnerHTML={{__html: node.name}}
              />
            </Link>
          </h1>

          <Grid
            items={posts && posts.edges}
            title='Articles'
          />
        </WithSidebar>
      )}
    </Page>
  )
}

CategoryPage.displayName = 'CategoryPage'

export default WithCustomized(WithApollo(graphql(gql(`
  query ($slug: String) {
    categories (
      first: 1,
      where: {slug: [$slug]}
    ) {
      edges {
        node {
          id
          link
          name
        }
      }
    }
    posts (
      first: 10,
      where: {categoryName: $slug}
    ) {
      edges {
        node {
          excerpt
          id
          link
          title
        }
      }
    }
  }
`), {
  options: ({query: {slug}}: {query: {slug: string}}) => ({variables: {slug}})
})(CategoryPage)))
