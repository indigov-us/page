// @flow

import {Link} from 'next-url-prettifier'
import React from 'react'

type Props = {
  description?: string,
  imageURL?: string,
  route?: any,
  title?: string
}

const GridItem = ({description, imageURL, route, title}: Props) => (
  <Link route={route}>
    <a className='db no-underline mb3'>
      {imageURL && (
        <img src={imageURL} />
      )}
      <div
        className='f3 b black mv2 f-title'
        dangerouslySetInnerHTML={{__html: title}}
      />
      <div
        className='gray no-p-m'
        dangerouslySetInnerHTML={{__html: description}}
      />
    </a>
  </Link>
)

export default GridItem
