// @flow

import classNames from 'classnames'
import React from 'react'

type Props = {
  children: any,
  opaque?: boolean
}

const HeroNavButton = ({children, opaque}: Props) => (
  <a
    className={classNames(
      'dib b--transparent br-pill ba pv2 ph3 bw1 mh2 white no-underline hover-b--white',
      opaque && 'bg-primary'
    )}
    href='javascript:void(0)'
  >
    {children}
  </a>
)

export default HeroNavButton
