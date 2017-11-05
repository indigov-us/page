// @flow

import React from 'react'

import WithBackButton from '../../hoc/with-contact-slide-back-button'

const Letter = () => (
  <WithBackButton>
    <h1 className='tc'>{'Send us a letter'}</h1>
  </WithBackButton>
)

export default Letter
