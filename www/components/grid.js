// @flow

import React from 'react'

import GridItem from '../components/grid-item'

type Props = {
  items?: Array<{
    node: {
      excerpt: string,
      id: string,
      link: string,
      title: string
    }
  }>,
  title?: string
}

const Grid = ({items, title}: Props) => (
  <div>
    {title && (
      <div
        className='f3 b mv3'
        dangerouslySetInnerHTML={{__html: title}}
      />
    )}

    <div className='cf'>
      {items && items.map(({node}) => (
        <div
          className='w-100 w-50-m w-third-l'
          key={node.id}
        >
          <GridItem
            description={node.excerpt}
            link={node.link}
            title={node.title}
          />
        </div>
      ))}
    </div>
  </div>
)

export default Grid
