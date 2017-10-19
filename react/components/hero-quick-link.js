// @flow

import React from 'react'

type Props = {
  children: any
}

const HeroQuickLink = ({children}: Props) => (
  <a
    className='fl w-100 w-50-m w-25-l white bg-black-50 tc b no-underline ba b--white-10 relative'
    href='javascript:void(0)'
  >
    <div className='children absolute left-0 right-0'>
      {children}
    </div>
    <style jsx>{`
      a { height: 150px }
      .children {
        top: 50%;
        transform: translateY(-50%);
      }
    `}</style>
  </a>
)

export default HeroQuickLink
