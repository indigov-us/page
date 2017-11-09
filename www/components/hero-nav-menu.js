// @flow

import React from 'react'

type Props = {
  html: ?string
}

const HeroNavMenu = ({html}: Props) => (
  <div>
    <div
      className='hero-nav-menu'
      dangerouslySetInnerHTML={{__html: html}}
    />
    <style global jsx>{`
      .hero-nav-menu ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .hero-nav-menu ul li {
        border: transparent solid white;
        display: inline-block;
        position: relative;
      }
      .hero-nav-menu ul li.menu-item-has-children > a:after {
        content: "\\2193";
        padding-left: 0.5rem;
      }
      .hero-nav-menu ul li:hover {
        border-color: white;
      }
      .hero-nav-menu ul li a {
        color: white;
        display: inline-block;
        padding: 0 1rem;
        text-align: center;
        text-decoration: none;
      }

      .hero-nav-menu ul ul.sub-menu {
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        position: absolute;
        text-align: center;
        z-index: 1;
      }
      .hero-nav-menu ul ul.sub-menu li a {
        font-size: 0.875rem;
      }

      .hero-nav-menu ul li:hover ul.sub-menu {
        display: block;
      }
    `}</style>
  </div>
)

export default HeroNavMenu
