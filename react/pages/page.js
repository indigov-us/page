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
    pages?: {
      edges: Array<{
        node: {
          content: string,
          id: string,
          pageId: string,
          slug: string,
          title: string
        }
      }>
    }
  }
}

const PagePage = ({data: {pages}}: Props) => {
  const node = pages && pages.edges[0].node

  return (
    <Page
      title={node && node.title}
    >
      <WithSidebar>
        {node && (
          <article>
            <h1 className='mb2 f-title'>
              <Link route={linkTo('question', {idSlug: `${node.pageId}-${node.slug}`})}>
                <a
                  className='black no-underline'
                  dangerouslySetInnerHTML={{__html: node.title}}
                />
              </Link>
            </h1>

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

PagePage.displayName = 'PagePage'

export default WithCustomized(WithApollo(graphql(gql(`
  query ($id: Int) {
    pages (
      first: 1,
      where: {id: $id}
    ) {
      edges {
        node {
          content
          id
          pageId
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
})(PagePage)))
