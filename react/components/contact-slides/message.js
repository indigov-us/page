// @flow

import React from 'react'

import WithBackButton from '../../hoc/with-contact-slide-back-button'

const Message = () => (
  <WithBackButton>
    <h1 className='tc'>{'Send us a message'}</h1>
  </WithBackButton>
)

export default Message
