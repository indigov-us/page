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
      'dib b--transparent br-pill ba pv2 ph3 bw1 mh2 white no-underline',
      opaque && 'bg-orange'
    )}
    href='javascript:void(0)'
  >
    {children}

    <style jsx>{`
      a:hover { border-color: #fff }
    `}</style>
  </a>
)

export default HeroNavButton
