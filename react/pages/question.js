// @flow

import {Link} from 'next-url-prettifier'
import React from 'react'
import {gql, graphql} from 'react-apollo'

import WithCustomized from '../hoc/with-customized'
import WithApollo from '../hoc/with-apollo'
import Page from '../components/page'
import {Router} from '../routes'

type Props = {
  data: {
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

const Question = ({data: {questions}}: Props) => {
  const node = questions && questions.edges[0].node

  return (
    <Page
      title={node && node.title}
    >
      <div className='container'>
        {node && (
          <article className='mw center'>
            <h1 className='mb2 f-title'>
              <Link route={Router.linkPage('question', {idSlug: `${node.questionId}-${node.slug}`})}>
                <a
                  className='black no-underline'
                  dangerouslySetInnerHTML={{__html: node.title}}
                />
              </Link>
            </h1>

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

Question.displayName = 'Question'

export default WithCustomized(WithApollo(graphql(gql(`
  query ($id: Int) {
    questions (
      first: 1,
      where: {id: $id}
    ) {
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
`), {
  options: ({query: {idSlug}}: {query: {idSlug: string}}) => {
    const idMatch = idSlug.match(/^(\d+)/)
    return idMatch ? {variables: {id: idMatch[1]}} : {}
  }
})(Question)))
