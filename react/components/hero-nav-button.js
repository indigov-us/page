// @flow

import classNames from 'classnames'
import React from 'react'

type Props = {
  children: any,
  className?: string,
  opaque?: boolean
}

const HeroNavButton = ({children, className, opaque}: Props) => (
  <a
    className={classNames(
      'dib b--transparent br-pill ba pv2 ph3 bw1 white no-underline hover-b--white',
      opaque && 'bg-primary',
      className
    )}
    href='javascript:void(0)'
  >
    {children}
  </a>
)

export default HeroNavButton
