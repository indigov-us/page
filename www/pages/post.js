// @flow

import gql from 'graphql-tag'
import React from 'react'
import {graphql} from 'react-apollo'

import ArticleFeedback from '../components/article-feedback'
import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import WithSidebar from '../hoc/with-sidebar'
import Page from '../components/page'
import fragments from '../lib/fragments'

import type {Post} from '../lib/types'

type Props = {
  data: {
    posts?: {
      edges: Array<{
        node: Post & {
          content: string
        }
      }>
    }
  }
}

const PostPage = ({data: {posts}}: Props) => {
  const node = posts && posts.edges[0].node

  return (
    <Page
      title={node && node.title}
    >
      <div className='container'>
        <WithSidebar>
          {node && (
            <article>
              <h1 className='mb2 f-title'>
                <a
                  className='black no-underline'
                  dangerouslySetInnerHTML={{__html: node.title}}
                  href={node.link}
                />
              </h1>

              <div className='mv2 gray'>
                {`By `}
                <span>{node.author.name}</span>
              </div>

              {node.featuredImage && (
                <img
                  className='db'
                  src={node.featuredImage && node.featuredImage.sourceUrl}
                />
              )}

              <div
                className='lh-copy'
                dangerouslySetInnerHTML={{__html: node.content}}
              />

              <hr className='mv4' />

              <div className='bg-light-gray pv3 tc'>
                <ArticleFeedback />
              </div>
            </article>
          )}
        </WithSidebar>
      </div>
    </Page>
  )
}

PostPage.displayName = 'PostPage'

export default WithCustomized(WithApollo(graphql(gql(`
  query ($id: Int) {
    posts (
      first: 1,
      where: {id: $id}
    ) {
      edges {
        node {
          content
          ...post
        }
      }
    }
  }
  ${fragments.post}
`), {
  options: ({query: {idSlug}}: {query: {idSlug: string}}) => {
    const idMatch = idSlug.match(/^(\d+)/)
    return idMatch ? {variables: {id: parseInt(idMatch[1])}} : {}
  }
})(PostPage)))
