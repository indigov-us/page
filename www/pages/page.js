// @flow

import gql from 'graphql-tag'
import React from 'react'
import {graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import WithSidebar from '../hoc/with-sidebar'
import Page from '../components/page'

type Props = {
  data: {
    pages?: {
      edges: Array<{
        node: {
          content: string,
          featuredImage?: {
            altText: string,
            sourceUrl: string
          },
          id: string,
          link: string,
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
      heroProps={{
        description: false,
        title: node && node.title,
        showSearch: false
      }}
      showNewsletterSubscriptionForm={false}
      title={node && node.title}
    >
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

PagePage.displayName = 'PagePage'

export default WithCustomized(WithApollo(graphql(gql(`
  query ($slug: String) {
    pages (
      first: 1,
      where: {name: $slug}
    ) {
      edges {
        node {
          content
          featuredImage {
            altText
            sourceUrl
          }
          id
          link
          title
        }
      }
    }
  }
`), {
  options: ({query: {slug}}: {query: {slug: string}}) => ({variables: {slug}})
})(PagePage)))
