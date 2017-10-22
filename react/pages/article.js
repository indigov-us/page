// @flow

import {Link} from 'next-url-prettifier'
import React from 'react'
import {gql, graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import WithSidebar from '../hoc/with-sidebar'
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

const ArticlePage = ({data: {posts}}: Props) => {
  const node = posts && posts.edges[0].node

  return (
    <Page
      title={node && node.title}
    >
      <WithSidebar>
        {node && (
          <article>
            <h1 className='mb2 f-title'>
              <Link route={linkTo('article', {idSlug: `${node.postId}-${node.slug}`})}>
                <a
                  className='black no-underline'
                  dangerouslySetInnerHTML={{__html: node.title}}
                />
              </Link>
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
          </article>
        )}
      </WithSidebar>
    </Page>
  )
}

ArticlePage.displayName = 'Article'

export default WithCustomized(WithApollo(graphql(gql(`
  query ($id: Int) {
    posts (
      first: 1,
      where: {id: $id}
    ) {
      edges {
        node {
          author {
            name
          }
          content
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
  options: ({query: {idSlug}}: {query: {idSlug: string}}) => {
    const idMatch = idSlug.match(/^(\d+)/)
    return idMatch ? {variables: {id: idMatch[1]}} : {}
  }
})(ArticlePage)))
