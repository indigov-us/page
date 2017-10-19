// @flow

import React from 'react'

type Props = {
  Icon?: any,
  iconSize?: number,
  title: string
}

const HeroQuickLink = ({Icon, iconSize, title}: Props) => (
  <a
    className='fl w-100 w-50-m w-25-l white tc b no-underline ba bg-black-40 b--white-10 relative hover-bg-primary bg-animate'
    href='javascript:void(0)'
  >
    <div className='v-center absolute left-0 right-0'>
      {Icon && (
        <div className='mb1'>
          <Icon size={iconSize || 50} />
        </div>
      )}
      <div>{title}</div>
    </div>
    <style jsx>{`
      a { height: 150px }
    `}</style>
  </a>
)

export default HeroQuickLink
