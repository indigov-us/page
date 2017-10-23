// @flow

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import CloseIcon from 'react-icons/lib/io/ios-close'

import {closedMenu, openedMenu} from '../states/with-mobile-menu'

type Props = {
  children: any
}

type State = {
  isOpen: boolean
}

const transitionDuration = 150 // in ms
const menuWidth = 75 // % of screen

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
          }, transitionDuration + 1)
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
          className='fixed top-0 right-0 bottom-0 bg-black white menu dn'
          ref={r => { this.mobileMenuNode = r }}
        >
          <div className='ma3'>
            <div className='cf mb3'>
              <a
                className='white db fl w-20'
                href='javascript:void(0)'
                onClick={this.closeMenu}
              >
                <CloseIcon size={40} />
              </a>
              <div className='fl w-80' />
            </div>

            <div>{'this is the menu'}</div>
          </div>
        </div>

        <style jsx>{`
          .content {
            will-change: transform;
            transition: transform ${transitionDuration}ms ease-out;
          }
          .content.is-open { transform: translateX(-${menuWidth}%) }
          .menu { width: ${menuWidth}% }
        `}</style>
      </div>
    )
  }
}

export default MobileMenu
