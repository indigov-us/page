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
        className='fixed bg-white ba0 outline-0 relative'
        closeTimeoutMS={closeTransitionDuration}
        isOpen={isOpen}
        overlayClassName='z-1 fixed top-0 right-0 bottom-0 left-0 bg-black-60'
      >
        <a
          className='absolute top-0 right-0 black pa2 db z-1'
          href='javascript:void(0)'
          onClick={handleClose}
        >
          <CloseIcon size={40} />
        </a>

        {children}
      </ReactModal>

      <style
        global
        jsx
      >{`
        .ReactModal__Body--open { overflow: hidden }
        .ReactModal__Overlay { opacity: 0; transition: opacity ${openTransitionDuration}ms ease-out }
        .ReactModal__Overlay--after-open { opacity: 1 }
        .ReactModal__Overlay--before-close { opacity: 0 }
        .ReactModal__Content {
          left: 50%; top: 25%;
          transform: translate(-50%, -25%);
          width: 90%; max-width: 40em; max-height: 100%;
        }
      `}</style>
    </div>
  )
}

export default WithModal
