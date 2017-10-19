// @flow

import React from 'react'

type Props = {
  Icon?: any,
  iconSize?: number,
  title: string
}

const HeroQuickLink = ({Icon, iconSize, title}: Props) => (
  <a
    className='fl w-100 w-50-m w-25-l white tc b no-underline ba b--white-10 relative'
    href='javascript:void(0)'
  >
    <div className='children absolute left-0 right-0'>
      {Icon && (
        <div className='mb1'>
          <Icon size={iconSize || 50} />
        </div>
      )}
      <div>{title}</div>
    </div>
    <style jsx>{`
      a {
        background-color: rgba(0, 0, 0, 0.4);
        height: 150px;
        transition: background-color 0.25s ease-out;
        will-change: background-color;

        &:hover { background-color: rgba(#ff6300, 0.9) }
      }
      .children {
        top: 50%;
        transform: translateY(-50%);
      }
    `}</style>
  </a>
)

export default HeroQuickLink
