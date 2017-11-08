// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import WithSidebar from '../hoc/with-sidebar'
import Grid from '../components/grid'
import Page from '../components/page'

type Props = {
  data: {
    categories?: {
      edges: Array<{
        node: {
          children: {
            edges: Array<{
              node: {
                id: string,
                link: string,
                name: string
              }
            }>
          },
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
  },
  query: {
    subcategories: string
  }
}

const CategoryPage = ({data: {categories, posts}, query: {subcategories}}: Props) => {
  const node = categories && categories.edges.length && categories.edges[0].node

  // TODO: find correct category/subcategory by splitting subcategories

  return (
    <Page
      title={node && node.name}
    >
      <WithSidebar>
        {node && (
          <div>
            <h1 className='mb2 f-title'>
              <a
                className='black no-underline'
                dangerouslySetInnerHTML={{__html: node.name}}
                href={node.link}
              />
            </h1>

            <h2>{'Subcategories'}</h2>
            {node.children.edges.map(({node: {id, link, name}}) => (
              <div key={id}>
                <a href={link}>
                  {name}
                </a>
              </div>
            ))}
          </div>
        )}

        <Grid
          items={posts && posts.edges}
          title='Articles'
        />
      </WithSidebar>
    </Page>
  )
}

CategoryPage.displayName = 'CategoryPage'

export default WithCustomized(WithApollo(graphql(gql(`
  query ($slug: String) {
    categories (
      first: 1,
      where: {
        slug: [$slug]
      }
    ) {
      edges {
        node {
          children {
            edges {
              node {
                children {
                  edges {
                    node {
                      id
                      link
                      name
                    }
                  }
                }
                id
                link
                name
              }
            }
          }
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
