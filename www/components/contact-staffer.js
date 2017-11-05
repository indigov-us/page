// @flow

import React from 'react'

type Props = {
  avatar: {
    height: number,
    url: string,
    width: number
  },
  description?: string,
  id: string,
  name?: string
}

const ContactStaffer = ({avatar, description, id, name}: Props) => (
  <div>
    <div className='mb2'>
      <img
        className='br-100'
        height={avatar.height}
        src={avatar.url}
        width={avatar.width}
      />
    </div>
    <div className='b black mb1 f4'>{name}</div>
    <div className='gray'>{description}</div>
  </div>
)

export default ContactStaffer
