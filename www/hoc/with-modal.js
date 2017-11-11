// @flow

import React from 'react'
import ReactModal from 'react-modal'
import CloseIcon from 'react-icons/lib/io/ios-close'

const openTransitionDuration = 300 // in ms
const closeTransitionDuration = 200 // in ms

type Props = {
  children: any,
  handleClose?: (SyntheticEvent<*>) => any,
  isOpen?: boolean
}

const WithModal = ({children, handleClose, isOpen}: Props) => {
  return (
    <div>
      <ReactModal
        className='absolute top-1 top-2-ns right-0 right-1-m right-2-l bottom-1 bottom-2-ns left-0 left-1-m left-2-l bg-white ba0 outline-0 relative container'
        closeTimeoutMS={closeTransitionDuration}
        isOpen={isOpen}
        overlayClassName='z-1 fixed top-0 right-0 bottom-0 left-0 bg-black-60'
      >
        <a
          className='absolute top-0 right-0 black pa2 db'
          href='javascript:void(0)'
          onClick={handleClose}
        >
          <CloseIcon size={40} />
        </a>

        <div className='pa3 pa4-ns'>
          {children}
        </div>
      </ReactModal>

      <style
        global
        jsx
      >{`
        .ReactModal__Body--open { overflow: hidden }
        .ReactModal__Overlay { opacity: 0; transition: opacity ${openTransitionDuration}ms ease-out }
        .ReactModal__Overlay--after-open { opacity: 1 }
        .ReactModal__Overlay--before-close { opacity: 0 }
      `}</style>
    </div>
  )
}

export default WithModal
