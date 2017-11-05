// @flow

import PropTypes from 'prop-types'
import React from 'react'

type Props = {
  children: any
}

type Context = {
  goToSlide: (slide: number) => any
}

const WithContactSlideBackButton = ({children}: Props, {goToSlide}: Context) => (
  <div>
    <div>
      <a
        className='b'
        href='javascript:void(0)'
        onClick={() => goToSlide(0)}
      >
        {'Back'}
      </a>
    </div>
    {children}
  </div>
)

WithContactSlideBackButton.contextTypes = {
  goToSlide: PropTypes.func
}

export default WithContactSlideBackButton
