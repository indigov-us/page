// @flow

import React from 'react'

type Props = {
  description?: string,
  imageURL?: string,
  link?: string,
  title?: string
}

const GridItem = ({description, imageURL, link, title}: Props) => (
  <a
    className='db no-underline mb3'
    href={link}
  >
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
)

export default GridItem
