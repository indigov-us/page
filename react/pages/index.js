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
    pages?: {
      edges: Array<{
        node: {
          excerpt: string,
          featuredImage?: {
            altText: string,
            sourceUrl: string
          },
          id: string,
          pageId: string,
          slug: string,
          title: string
        }
      }>
    },
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

const HomePage = ({data: {pages, posts, questions}}: Props) => {
  return (
    <Page
      hero={{quickLinks: true}}
      title='Home'
    >
      <div className='container'>
        <Grid
          items={posts && posts.edges}
          itemRoute={({postId, slug}) => linkTo('article', {idSlug: `${postId}-${slug}`})}
          title='Articles'
        />

        <Grid
          items={questions && questions.edges}
          itemRoute={({questionId, slug}) => linkTo('question', {idSlug: `${questionId}-${slug}`})}
          title='Questions'
        />

        <Grid
          items={pages && pages.edges}
          itemRoute={({pageId, slug}) => linkTo('page', {idSlug: `${pageId}-${slug}`})}
          title='Pages'
        />
      </div>
    </Page>
  )
}

HomePage.displayName = 'HomePage'

export default WithCustomized(WithApollo(graphql(gql(`
  query {
    pages {
      edges {
        node {
          excerpt
          featuredImage {
            altText
            sourceUrl
          }
          id
          pageId
          slug
          title
        }
      }
    }
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
`))(HomePage)))
