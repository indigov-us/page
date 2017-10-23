// @flow

import React from 'react'
import GridItem from '../components/grid-item'

type Props = {
  title?: string,
  itemRoute: any => any,
  items?: Array<{
    node: Object
  }>
}

const Grid = ({items, itemRoute, title}: Props) => (
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
            route={itemRoute(node)}
            title={node.title}
          />
        </div>
      ))}
    </div>
  </div>
)

export default Grid
