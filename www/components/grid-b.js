// @flow

import React from 'react'

import GridItemPost from '../components/grid-item-post'

import type {Post} from '../lib/types'

type Props = {
  posts?: {
    edges: Array<{
      node: Post & {
        excerpt: string
      }
    }>
  }
}

const GridB = ({posts}: Props) => {
  if (!posts) return

  return (
    <div>
      {posts.edges.slice(0, 1).map(({node}) => (
        <div
          className='first mb3'
          key={node.id}
        >
          <GridItemPost
            excerptClassName='near-black'
            post={node}
            titleTagName='h2'
          />
        </div>
      ))}

      <div className='cf'>
        {posts.edges.slice(1).map(({node}) => (
          <div
            className='fl w-100 w-50-ns mb3 rest'
            key={node.id}
          >
            <GridItemPost
              leftColClassName='w-third-ns'
              post={node}
              rightColClassName='w-two-thirds-ns'
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (min-width: 30em) {
          .first { height: 400px }
          .rest { height: 200px }
        }
      `}</style>
    </div>
  )
}

export default GridB
