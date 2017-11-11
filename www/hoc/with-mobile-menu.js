// @flow

import classNames from 'classnames'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import CloseIcon from 'react-icons/lib/io/ios-close'

import MobileNavMenu from '../components/mobile-nav-menu'
import {themeId} from '../lib/theme'
import {closedMenu, openedMenu} from '../states/with-mobile-menu'

type Props = {
  children: any,
  data: {
    theme?: {
      primaryMenu: string
    }
  }
}

type State = {
  isOpen: boolean
}

const transitionDuration = 150 // in ms
const menuWidth = 90 // % of screen

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
          mobileMenuNode.style.display = 'block'
        } else {
          // wait until the transition is finished, then hide the menu
          setTimeout(() => {
            mobileMenuNode.style.display = 'none'
          }, transitionDuration + 1)
        }
      }
    }
  }

  mobileMenuNode: ?Object

  render () {
    const {children, data: {theme}} = this.props
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
          className={classNames(
            'fixed top-0 right-0 bottom-0 bg-black white menu overflow-y-scroll touch',
            isOpen && 'is-open'
          )}
          ref={r => { this.mobileMenuNode = r }}
          style={{display: 'none'}}
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

            <MobileNavMenu html={theme && theme.primaryMenu} />
          </div>
        </div>

        <style jsx>{`
          .content {
            will-change: transform;
            transition: transform ${transitionDuration}ms ease-out;
          }
          .content.is-open { transform: translateX(-${menuWidth}%) }
          .menu {
            width: ${menuWidth}%;
            will-change: transform;
            transform: translateX(${menuWidth}%);
            transition: transform ${transitionDuration}ms ease-out;
          }
          .menu.is-open { transform: translateX(0) }
        `}</style>
      </div>
    )
  }
}

export default graphql(gql(`
  query {
    theme (id: "${themeId}") {
      primaryMenu
    }
  }
`))(MobileMenu)
