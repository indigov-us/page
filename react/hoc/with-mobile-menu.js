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

const transitionDuration = 150 // in ms

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

  componentDidUpdate (props: Props, state: State) {
    const wasOpen = state.isOpen
    const {isOpen} = this.state

    if (wasOpen !== isOpen) {
      const {mobileMenuNode} = this
      if (mobileMenuNode) {
        if (isOpen) {
          // show the mobile menu right away
          mobileMenuNode.className = mobileMenuNode.className.replace(/\s*dn\s*/, '')
        } else {
          // wait until the transition is finished, then hide the menu
          setTimeout(() => {
            mobileMenuNode.className = `${mobileMenuNode.className} dn`
          }, transitionDuration)
        }
      }
    }
  }

  mobileMenuNode: ?Object

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

        <div
          className='fixed top-0 right-0 bottom-0 left-0 tr bg-black white menu dn'
          ref={r => { this.mobileMenuNode = r }}
        >
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
            transition: transform ${transitionDuration}ms ease-out;
          }
          .content.is-open { transform: translateX(-75%) }
        `}</style>
      </div>
    )
  }
}

export default MobileMenu
