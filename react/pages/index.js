// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'

import GraphQL from '../hoc/graphql'
import GridItem from '../components/grid-item'
import Page from '../components/page'
import {Router} from '../routes'

type Props = {
  data: {
    posts?: {
      edges: Array<{
        node: {
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
  }
}

const Home = ({data: {posts}}: Props) => (
  <Page
    hero={{quickLinks: true}}
    title='Home'
  >
    <div className='container'>
      <div className='f3 b mv3'>{'Articles'}</div>
      <div className='cf'>
        {posts && posts.edges.map(({node}) => (
          <div
            className='w-100 w-50-m w-third-l'
            key={node.id}
          >
            <GridItem
              description={node.excerpt}
              imageURL={node.featuredImage && node.featuredImage.sourceUrl}
              route={Router.linkPage('article', {idSlug: `${node.postId}-${node.slug}`})}
              title={node.title}
            />
          </div>
        ))}
      </div>
    </div>
  </Page>
)

Home.displayName = 'Home'

export default GraphQL(graphql(gql(`
  query {
    posts {
      edges {
        node {
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
`))(Home))
