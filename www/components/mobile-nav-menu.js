// @flow

import React from 'react'

type Props = {
  html: ?string
}

const MobileNavMenu = ({html}: Props) => (
  <div>
    <div
      className='mobile-nav-menu'
      dangerouslySetInnerHTML={{__html: html}}
    />
    <style global jsx>{`
      .mobile-nav-menu ul {
        list-style: none;
        padding: 0;
      }
      .mobile-nav-menu ul li a {
        color: white;
        display: block;
        padding: 0.5rem 0;
        text-decoration: none;
      }

      .mobile-nav-menu ul ul.sub-menu {
        padding-left: 2rem;
      }
    `}</style>
  </div>
)

export default MobileNavMenu
