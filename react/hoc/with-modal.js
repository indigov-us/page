// @flow

import React, {Component} from 'react'
import ReactModal from 'react-modal'
import CloseIcon from 'react-icons/lib/io/ios-close'

const openTransitionDuration = 300 // in ms
const closeTransitionDuration = 200 // in ms

type Props = {
  button: any,
  children: any,
  className?: string
}

type State = {
  isOpen: boolean
}

class WithModal extends Component<Props, State> {
  constructor () {
    super()
    this.state = {isOpen: false}
  }

  closeModal = () => {
    this.setState({isOpen: false})
  }

  openModal = () => {
    this.setState({isOpen: true})
  }

  render () {
    const {button, children, className} = this.props
    const {isOpen} = this.state

    return [
      <a
        className='outline-0'
        href='javascript:void(0)'
        key='button'
        onClick={this.openModal}
      >
        {button}
      </a>,

      <ReactModal
        className='absolute top-2 right-2 bottom-2 left-2 bg-white ba0 outline-0 relative container'
        closeTimeoutMS={closeTransitionDuration}
        isOpen={isOpen}
        key='modal'
        overlayClassName='z-1 fixed top-0 right-0 bottom-0 left-0 bg-black-60'
      >
        <a
          className='absolute top-0 right-0 black pa2 db'
          href='javascript:void(0)'
          onClick={this.closeModal}
        >
          <CloseIcon size={40} />
        </a>

        <div className={className}>
          {children}
        </div>
      </ReactModal>,

      <style
        global
        key='styles'
        jsx
      >{`
        .ReactModal__Body--open { overflow: hidden }
        .ReactModal__Overlay { opacity: 0; transition: opacity ${openTransitionDuration}ms ease-out }
        .ReactModal__Overlay--after-open { opacity: 1 }
        .ReactModal__Overlay--before-close { opacity: 0 }
      `}</style>
    ]
  }
}

export default WithModal
