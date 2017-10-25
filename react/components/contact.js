// @flow

import React from 'react'

import WithSlides from '../hoc/with-slides'

const Contact = () => (
  <WithSlides
    slides={[
      <div>{'this is the first slide'}</div>,
      <div>{'this is the second slide'}</div>
    ]}
  />
)

export default Contact
