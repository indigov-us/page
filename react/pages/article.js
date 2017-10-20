// @flow

import {Link} from 'next-url-prettifier'
import React from 'react'
import {gql, graphql} from 'react-apollo'

import Customized from '../hoc/customized'
import GraphQL from '../hoc/graphql'
import Page from '../components/page'
import {Router} from '../routes'

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

const Article = ({data: {posts}}: Props) => {
  const node = posts && posts.edges[0].node

  return (
    <Page
      title={node && node.title}
    >
      <div className='container'>
        {node && (
          <article className='mw center'>
            <h1 className='mb2'>
              <Link route={Router.linkPage('article', {idSlug: `${node.postId}-${node.slug}`})}>
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

            <div>
              <img src={node.featuredImage && node.featuredImage.sourceUrl} />
            </div>

            <div dangerouslySetInnerHTML={{__html: node.content}} />
          </article>
        )}
      </div>

      <style jsx>{`
        .mw { max-width: 600px }
      `}</style>
    </Page>
  )
}

Article.displayName = 'Article'

export default Customized(GraphQL(graphql(gql(`
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
})(Article)))
