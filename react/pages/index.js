// @flow

import React from 'react'
import {gql, graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
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
    },
    questions?: {
      edges: Array<{
        node: {
          content: string,
          id: string,
          questionId: string,
          slug: string,
          title: string
        }
      }>
    }
  }
}

const Home = ({data: {posts, questions}}: Props) => (
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

      <div className='f3 b mv3'>{'Questions'}</div>
      <div className='cf'>
        {questions && questions.edges.map(({node}) => (
          <div
            className='w-100 w-50-m w-third-l'
            key={node.id}
          >
            <GridItem
              route={Router.linkPage('question', {idSlug: `${node.questionId}-${node.slug}`})}
              title={node.title}
            />
          </div>
        ))}
      </div>
    </div>
  </Page>
)

Home.displayName = 'Home'

export default WithCustomized(WithApollo(graphql(gql(`
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
    questions {
      edges {
        node {
          content
          id
          questionId
          slug
          title
        }
      }
    }
  }
`))(Home)))
