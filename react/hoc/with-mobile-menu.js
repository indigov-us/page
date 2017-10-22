// @flow

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import {closedMenu, openedMenu} from '../states/with-mobile-menu'

type Props = {
  children: any
}

type State = {
  isOpen: boolean
}

class MobileMenu extends Component<Props, State> {
  static childContextTypes = {
    openMobileMenu: PropTypes.func
  }

  constructor () {
    super()
    this.state = {isOpen: false}
  }

  closeMenu = () => {
    this.setState(closedMenu)
  }

  openMenu = () => {
    this.setState(openedMenu)
  }

  getChildContext = () => ({
    openMobileMenu: this.openMenu
  })

  render () {
    const {children} = this.props
    const {isOpen} = this.state

    return (
      <div>
        <div
          className={classNames(
            'content relative z-1 bg-white',
            isOpen && 'is-open'
          )}
        >
          {children}
        </div>

        <div className='fixed top-0 right-0 bottom-0 left-0 tr bg-black white menu'>
          <a
            href='javascript:void(0)'
            onClick={this.closeMenu}
          >
            {'Close'}
          </a>
        </div>

        <style jsx>{`
          .content {
            will-change: transform;
            transition: transform 0.15s ease-out;

            &.is-open { transform: translateX(-75%) }
          }
        `}</style>
      </div>
    )
  }
}

export default MobileMenu
